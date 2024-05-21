import axios, { AxiosError } from "axios";
import { isFunction, isNil } from "lodash";

import { AxiosHttpService } from "./axios-http-service";
import type {
  AfterReturningMiddleware,
  AsyncAfterReturningMiddleware,
  AsyncBeforeRequestMiddleware,
  BeforeRequestMiddleware,
  ExtraConfig,
  HttpMethod,
  IHttpResponse,
  SyncAfterReturningMiddleware,
  SyncBeforeRequestMiddleware,
} from "./types";
import {
  FAKE_HTTP_REQUEST_HASH,
  MAX_WAIT_MS,
  hash,
  isHTTPGetMethod,
  isPromise,
  removeNullOrUndefinedProperties,
} from "./types";

type HttpConfig = Partial<{
  token: string;
  middlewares: Partial<{
    afterReturning: AfterReturningMiddleware[];
    beforeRequest: BeforeRequestMiddleware[];
  }>;
}>;

class HttpBase {
  private _axiosConfig: { baseURL: string; token?: string };
  private _isCacheEnabled = false;

  private readonly _httpRequestCache = new Map<
    /* Request Object Hash */ string,
    {
      /** Milliseconds elapsed since, e.g Date.now() */
      createdAt: number;
      /** Axios instance */
      promise: Promise<any>;
    }
  >([]);

  private readonly _middleware: {
    afterReturning: AsyncAfterReturningMiddleware[];
    beforeRequest: AsyncBeforeRequestMiddleware[];
  } = {
    afterReturning: [],
    beforeRequest: [],
  };

  constructor(baseURL: string, config: HttpConfig = {}) {
    this._axiosConfig = {
      baseURL: baseURL,
      token: config.token,
    };

    (config.middlewares?.afterReturning || []).forEach((i) => {
      this.afterReturning(i);
    });

    (config.middlewares?.beforeRequest || []).forEach((i) => {
      this.beforeRequest(i);
    });
  }

  private _cacheRequest(
    /** Request Object Hash */
    requestHash: string,
    /** Axios instance */
    promise: Promise<any>
  ): void {
    this._httpRequestCache.set(requestHash, {
      createdAt: Date.now(),
      promise,
    });
  }

  setBaseURL(baseURL: string) {
    this._axiosConfig.baseURL = baseURL;
  }

  async call<T = unknown>(
    method: HttpMethod,
    url: string,
    parameters: Record<string, unknown> = {},
    extraConfig: ExtraConfig = {}
  ): Promise<IHttpResponse<T>> {
    /**
     * 发起真正的API请求
     *
     * @remarks
     *
     * API发送请求分两个阶段
     *
     * 1. 请求发起前
     * 2. 请求结束后
     *
     * **请求发起前**
     *
     * 执行所有的中间件，如果其中有一个中间件返回false，则意味着取消请求，此时HTTP模块将不会发起请求。
     *
     * **请求结束后**
     *
     * 执行所有的中间件，并且传入API业务响应。API业务响应的数据结构是：
     *
     * { code: number; data: any; desc: string; }
     *
     * 此时如果中间件返回false，根据isCatch的值，HTTP模块会选择吞掉，或者抛出异常。
     *
     * **异常处理**
     *
     * 异常分两种情况：
     *
     * 1. 应用服务器，比如Nginx返回的异常
     * 2. API网关返回的异常
     *
     * *应用服务器*
     *
     * 常见的应该是404之类的异常
     *
     * *API网关返回的异常*
     *
     * 1. 应用服务器返回的HTTP状态码 === 200，API服务响应的code !== 200
     *
     *  也就是业务处理过程中发生了异常
     *
     * 2. 应用服务器返回的HTTP状态码 !== 200，API服务响应的code !== 200
     *
     *  这种情况就是API响应请求的时候，把HTTP状态码也同步修改了，HTTP状态码可能是400，也可能是500。HTTP状态码不一定和API响应中的code一致。
     *  比如HTTP状态码可能是400（按照现在的约定是，如果API处理过程中出现了异常，API会把HTTP状态码统一改成400），但API业务响应中的code为600057。
     */
    const _issueApiRequest = async (): Promise<IHttpResponse<T>> => {
      /** beforeRequest，中间件 */
      let shouldRejectThisRequest = false;
      const beforeRequest = this._middleware.beforeRequest;
      const params = removeNullOrUndefinedProperties(parameters);
      for (const middleware of beforeRequest) {
        const result = await middleware(method, url, params, extraConfig);
        if (result === false) {
          shouldRejectThisRequest = true;
        }
      }

      if (shouldRejectThisRequest) {
        const exception: IHttpResponse<any> = {
          code: -1,
          data: {},
          desc: `BeforeRequest中间件返回false，请求取消，${method},\n ${url},\n ${JSON.stringify(
            params
          )},\n ${JSON.stringify(extraConfig)}`,
        };
        return await Promise.reject(exception);
      }

      try {
        // 使用Axios库，发起HTTP请求
        const ax = AxiosHttpService.create(this._axiosConfig);
        const axiosResponse = await ax.call<T>(
          method,
          url,
          params,
          extraConfig
        );
        // API业务响应
        const apiResponse = axiosResponse.data;

        // 有些场景下是不会有API响应的，比如上传文件的时候
        if (apiResponse) {
          // 使中间件机制，对API的业务响应结果进行处理。
          // 此时API响应结果的code字段是200，则表示业务处理正常进行
          // 此时API响应结果的code字段不是200，这表示业务处理过程中，遇到了异常情况，这时候根据shouldThrows判断是否要吞掉异常
          let shouldRejectThisResponse = false;
          const afterReturning = this._middleware.afterReturning;
          for (const middleware of afterReturning) {
            const ret = await middleware(apiResponse, extraConfig);
            if (ret === false) {
              shouldRejectThisResponse = true;
            }
          }

          if (shouldRejectThisResponse) {
            const exception: IHttpResponse<any> = {
              code: axiosResponse.status,
              data: {},
              desc: axiosResponse.statusText,
            };
            return await Promise.reject(exception);
          }

          return await Promise.resolve({
            code: axiosResponse.status,
            data: apiResponse as T,
            desc: axiosResponse.statusText,
          });
        }

        const response: IHttpResponse<any> = {
          code: axiosResponse.status,
          data: {},
          desc: axiosResponse.statusText,
        };
        return await Promise.resolve(response);
      } catch (error: any) {
        if (axios.isCancel(error)) {
          const exception: IHttpResponse<any> = {
            code: 200,
            data: {},
            desc: "Cancelled by user",
          };
          return await Promise.reject(exception);
        }

        const axiosResponse = error.response;
        const apiResponse = axiosResponse?.data as IHttpResponse<any> | null;

        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          const exception: IHttpResponse<any> = {
            code: axiosResponse?.status || 500,
            data: apiResponse || {},
            desc: JSON.stringify({
              code: axiosError.code,
              name: axiosError.name,
              desc: axiosError.message,
            }),
          };
          return await Promise.reject(exception);
        }

        if (!isNil(apiResponse)) {
          const afterReturning = this._middleware.afterReturning;
          for (const middleware of afterReturning) {
            await middleware(apiResponse, extraConfig);
          }

          const exception: IHttpResponse<any> = {
            code: axiosResponse.status,
            data: {},
            desc: axiosResponse.statusText,
          };

          // API返回异常
          return await Promise.reject(exception);
        }

        // 应用服务器返回的异常，比如应用服务器返回404错误
        const exception: IHttpResponse<any> = {
          code: axiosResponse.status,
          data: {},
          desc: axiosResponse.statusText,
        };
        return await Promise.reject(exception);
      }
    };

    /**
     * 电梯算法，合并HTTP Get请求
     *
     * @remarks
     *
     * 某些场景下，比如我们封装了一个业务Select组件。
     * 这个Select组件用在Form.List里，渲染Form.List的时候，同样的API请求会触发多次。
     * 使用一个简单的电梯算法合并这些请求。
     */
    const needsCache = isHTTPGetMethod(method) && this.isCacheEnabled;
    const requestHash = needsCache
      ? hash({
          method,
          url,
          parameters,
          extraConfig,
        })
      : FAKE_HTTP_REQUEST_HASH;

    if (!needsCache) {
      return await _issueApiRequest();
    }

    const cachedRequest = this._httpRequestCache.get(requestHash);
    if (cachedRequest && Date.now() - cachedRequest.createdAt <= MAX_WAIT_MS) {
      return await cachedRequest.promise;
    }
    const promise = _issueApiRequest();
    this._cacheRequest(requestHash, promise);
    return await promise;
  }

  /**
   * 添加中间件，中间件的调用时机是请求结束之后
   *
   * @example
   *
   * const beforeRequest: BeforeRequestMiddleware = (data, extraConfig) => {
   *   // do something
   * }
   *
   * const afterReturning: AfterReturningMiddleware = (data, extraConfig) => {
   *   // do something
   * }
   *
   * const api = AxiosHttp.create({
   *   accessToken: '',
   *   language: 'en_US',
   *   useApi2: false,
   * });
   *
   * api.beforeRequest(beforeRequest);
   * api.afterReturning(afterReturning);
   *
   * @param middleware
   * @returns
   */
  afterReturning(middleware: AfterReturningMiddleware): void {
    if (!isFunction(middleware)) {
      return;
    }

    if (!isPromise(middleware)) {
      this._middleware.afterReturning.push(
        async (data: IHttpResponse<any>, extraConfig: ExtraConfig) =>
          await new Promise<boolean | undefined>((resolve) => {
            resolve(
              (middleware as SyncAfterReturningMiddleware)(data, extraConfig)
            );
          })
      );
    } else {
      this._middleware.afterReturning.push(
        middleware as AsyncAfterReturningMiddleware
      );
    }
  }

  /**
   * 添加中间件，中间件的调用时机是请求发生前
   *
   * @example
   *
   * const beforeRequest: BeforeRequestMiddleware = (data, extraConfig) => {
   *   // do something
   * }
   *
   * const afterReturning: AfterReturningMiddleware = (data, extraConfig) => {
   *   // do something
   * }
   *
   * const api = AxiosHttp.create({
   *   accessToken: '',
   *   language: 'en_US',
   *   useApi2: false,
   * });
   *
   * api.beforeRequest(beforeRequest);
   * api.afterReturning(afterReturning);
   *
   * @param middleware
   * @returns
   */
  beforeRequest(middleware: BeforeRequestMiddleware): void {
    if (!isFunction(middleware)) {
      return;
    }

    if (!isPromise(middleware)) {
      this._middleware.beforeRequest.push(
        async (method, url, parameters, extraConfig) =>
          await new Promise<boolean | undefined>((resolve) => {
            resolve(
              (middleware as SyncBeforeRequestMiddleware)(
                method,
                url,
                parameters,
                extraConfig
              )
            );
          })
      );
    } else {
      this._middleware.beforeRequest.push(
        middleware as AsyncBeforeRequestMiddleware
      );
    }
  }

  disableCache() {
    this._isCacheEnabled = false;
  }

  enableCache() {
    this._isCacheEnabled = true;
  }

  get isCacheEnabled() {
    return this._isCacheEnabled;
  }
}

export { HttpBase };
export type { HttpConfig };

