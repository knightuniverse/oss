import type { AxiosInstance, AxiosResponse } from "axios";
import axios, { AxiosHeaders } from "axios";
import { forEach, isFunction, isNil, isNumber } from "lodash";

import type { ExtraConfig, HttpMethod, IHttpResponse } from "./types";
import { AXIOS_HTTP_TIMEOUT, needsURLSearchParams } from "./types";

class AxiosHttpService {
  private readonly baseURL: string = "";
  private readonly token: string | null;

  static create(
    config: Partial<{
      baseURL: string;
      token: string;
    }> = {}
  ): AxiosHttpService {
    return new AxiosHttpService(config);
  }

  constructor(
    config: Partial<{
      baseURL: string;
      token: string;
    }> = {}
  ) {
    const { baseURL = "", token = null } = config;
    this.baseURL = baseURL;
    this.token = token;
  }

  private _createClient(extraConfig: ExtraConfig = {}): AxiosInstance {
    const baseURL = this.baseURL;
    const accessToken = this.token;
    const {
      headers,
      enableBrowserCache = false,
      responseType,
      timeout = AXIOS_HTTP_TIMEOUT,
      withCredentials = false,
      cancelToken,
      onDownloadProgress,
      onUploadProgress,
    } = extraConfig;
    const axiosInstance = axios.create({
      baseURL: baseURL,
      timeout: isNumber(timeout) && timeout >= 0 ? timeout : AXIOS_HTTP_TIMEOUT,
    });

    axiosInstance.interceptors.request.use(
      (config) => {
        const axiosConfig = config;
        const axiosHeaders = new AxiosHeaders(config.headers || {});

        if (!isNil(accessToken)) {
          axiosHeaders.authorization = `Bearer ${accessToken}`;
        }

        if (!isNil(headers)) {
          forEach(headers, (v, k) => {
            axiosHeaders.set(k, v);
          });
        }

        const url = axiosConfig.url;

        if (!enableBrowserCache && url) {
          axiosConfig.url = `${url}${
            url.includes("?") ? "&" : "?"
          }_r=${Math.random()}`;
        }

        if (isFunction(cancelToken)) {
          axiosConfig.cancelToken = new axios.CancelToken(cancelToken);
        }

        if (isFunction(onDownloadProgress)) {
          axiosConfig.onDownloadProgress = onDownloadProgress;
        }

        if (isFunction(onUploadProgress)) {
          axiosConfig.onUploadProgress = onUploadProgress;
        }

        axiosConfig.headers = axiosHeaders;
        axiosConfig.responseType = isNil(responseType) ? "json" : responseType;
        axiosConfig.withCredentials = withCredentials;

        return axiosConfig;
      },

      async (error: any) => await Promise.reject(error)
    );

    return axiosInstance;
  }

  async call<T = unknown>(
    method: HttpMethod,
    url: string,
    parameters: Record<string, any>,
    extraConfig: ExtraConfig = {}
  ): Promise<AxiosResponse<IHttpResponse<T>>> {
    const client = this._createClient(extraConfig);
    const needsSearchParams = needsURLSearchParams(method);

    let data: Blob | FormData | Record<string, unknown> = parameters;
    if (!needsSearchParams && extraConfig.usingFormData === true) {
      data =
        parameters.formData instanceof FormData
          ? parameters.formData
          : (function createFormData() {
              const fd = new FormData();
              forEach(parameters, (v, k) => {
                if (v instanceof Blob) {
                  fd.append(k, v);
                } else {
                  fd.append(k, `${v}`);
                }
              });
              return fd;
            })();
    }

    if (
      !needsSearchParams &&
      extraConfig.usingBlob === true &&
      parameters.blob instanceof Blob
    ) {
      data = parameters.blob;
    }

    return needsSearchParams
      ? await client.request({
          method,
          url,
          // `params` 是与请求一起发送的 URL 参数
          params: parameters,
        })
      : await client.request({
          method,
          url,
          data,
        });
  }
}

export { AxiosHttpService };
