import type { Canceler } from 'axios';
import { forEach, has, isNil } from 'lodash';
import md5 from 'md5';
import queryString from 'query-string';

type HttpMethod = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';

interface IHttpResponse<T = unknown> {
  code: number;
  data: T;
  desc: string;
}

type CancelTokenExecutor = (cancel: Canceler) => void;

type ExtraConfig = Partial<{
  /**
   * 除了'access-token' | 'terminal' | 'token'之外，额外添加的HTTP请求头，
   */
  headers: Record<string, string>;
  /**
   * 在请求的URL中的添加随机数，防止API缓存
   * @default false
   */
  enableBrowserCache: boolean;
  // `responseType` indicates the type of data that the server will respond with
  // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
  // browser only: 'blob'
  responseType:
    | 'arraybuffer'
    | 'blob'
    | 'document'
    | 'json'
    | 'text'
    | 'stream';
  /**
   * 请求超时，默认值是1000*50
   */
  timeout: number;
  /**
   * `data` is the data to be sent as the request body
   * Only applicable for request methods 'PUT', 'POST', 'DELETE', and 'PATCH'
   * When no `transformRequest` is set, must be of one of the following types:
   * - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
   * - Browser only: FormData, File, Blob
   * - Node only: Stream, Buffer
   *
   * @example
   *
   * yield* toGenerator(
   *   api.put<OSSFile>(
   *     endpoint.presignedUrl,
   *     { blob },
   *     {
   *       headers: headers,
   *       hideTimes: true,
   *       usingBlob: true,
   *       onUploadProgress: onUploadProgress,
   *     },
   *   ),
   * );
   */
  usingBlob: boolean;
  /**
   * `data` is the data to be sent as the request body
   * Only applicable for request methods 'PUT', 'POST', 'DELETE', and 'PATCH'
   * When no `transformRequest` is set, must be of one of the following types:
   * - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
   * - Browser only: FormData, File, Blob
   * - Node only: Stream, Buffer
   *
   * @example
   *
   * yield* toGenerator(
   *   api.put(
   *     '', // your api endpoint
   *     { formData: new FormData() }, // parameters
   *     {
   *       headers: headers,
   *       hideTimes: true,
   *       usingFormData: true,
   *       onUploadProgress: onUploadProgress,
   *     },
   *   ),
   * );
   *
   * yield* toGenerator(
   *   api.put(
   *     '', // your api endpoint
   *     { a: '', b:'', c:'' }, // parameters
   *     {
   *       headers: headers,
   *       hideTimes: true,
   *       usingFormData: true,
   *       onUploadProgress: onUploadProgress,
   *     },
   *   ),
   * );
   */
  usingFormData: boolean;

  withCredentials: boolean;
  /**
   * `cancelToken` specifies a cancel token that can be used to cancel the request
   */
  cancelToken: CancelTokenExecutor;
  /**
   * `onUploadProgress` allows handling of progress events for uploads
   * browser only
   */
  onUploadProgress: (progressEvent: any) => void;
  /**
   * `onDownloadProgress` allows handling of progress events for downloads
   * browser only
   */
  onDownloadProgress: (progressEvent: any) => void;
}>;

type SyncBeforeRequestMiddleware = (
  method: HttpMethod,
  url: string,
  parameters: Record<string, unknown>,
  extraConfig: ExtraConfig,
) => boolean | undefined;
type AsyncBeforeRequestMiddleware = (
  method: HttpMethod,
  url: string,
  parameters: Record<string, unknown>,
  extraConfig: ExtraConfig,
) => Promise<boolean | undefined>;
/**
 * return false if you do not want to handle http process further
 */
type BeforeRequestMiddleware =
  | SyncBeforeRequestMiddleware
  | AsyncBeforeRequestMiddleware;

type SyncAfterReturningMiddleware = (
  data: any,
  extraConfig: ExtraConfig,
) => boolean | undefined;
type AsyncAfterReturningMiddleware = (
  data: any,
  extraConfig: ExtraConfig,
) => Promise<boolean | undefined>;
/**
 * return false if you do not want to handle http process further
 */
type AfterReturningMiddleware =
  | SyncAfterReturningMiddleware
  | AsyncAfterReturningMiddleware;

interface IHttp {
  call: <T = unknown>(
    method: HttpMethod,
    url: string,
    parameters?: Record<string, unknown>,
    extraConfig?: ExtraConfig,
  ) => Promise<IHttpResponse<T>>;
  get: <T = unknown>(
    url: string,
    parameters?: Record<string, unknown>,
    extraConfig?: ExtraConfig,
  ) => Promise<IHttpResponse<T>>;
  delete: <T = unknown>(
    url: string,
    parameters?: Record<string, unknown>,
    extraConfig?: ExtraConfig,
  ) => Promise<IHttpResponse<T>>;
  patch: <T = unknown>(
    url: string,
    parameters?: Record<string, unknown>,
    extraConfig?: ExtraConfig,
  ) => Promise<IHttpResponse<T>>;
  post: <T = unknown>(
    url: string,
    parameters?: Record<string, unknown>,
    extraConfig?: ExtraConfig,
  ) => Promise<IHttpResponse<T>>;
  put: <T = unknown>(
    url: string,
    parameters?: Record<string, unknown>,
    extraConfig?: ExtraConfig,
  ) => Promise<IHttpResponse<T>>;
}

const AXIOS_HTTP_TIMEOUT = 1000 * 60;
const FAKE_HTTP_REQUEST_HASH = '21febc4b-a082-42c5-93ee-4ed1ee18df8d';
const MAX_WAIT_MS = 500; /** ms */

function isPromise(obj: any): boolean {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
}

function removeNullOrUndefinedProperties(
  parameters: Record<string, unknown> = {},
): NonNullable<Record<string, unknown>> {
  const data: NonNullable<Record<string, unknown>> = {};
  forEach(parameters, (v, k) => {
    if (isNil(v)) {
      return;
    }
    data[k] = v;
  });
  return data;
}

function isHttpResponseLike<T = unknown>(data: any): data is IHttpResponse<T> {
  return has(data, 'code') && has(data, 'data') && has(data, 'desc');
}

/**
 * 为每个请求创建一个哈希
 *
 * @param request
 */
function hash(request: {
  method: HttpMethod;
  url: string;
  parameters: Record<string, unknown>;
  extraConfig: ExtraConfig;
}): string {
  return md5(JSON.stringify(request));
}

function isHTTPGetMethod(method: string): boolean {
  return method.toLowerCase() === 'get';
}

function needsURLSearchParams(method: HttpMethod) {
  return new Set(['DELETE', 'GET']).has(method);
}

function digest(jsonObj: Record<string, any>): string {
  const arr: any = [];
  const params: any = {};
  for (const key of Object.keys(jsonObj)) {
    if (!jsonObj[key]) {
      continue;
    }
    arr.push(key);
  }
  arr.sort();
  for (const i of Object.keys(arr)) {
    params[arr[i]] = jsonObj[arr[i]];
  }
  return md5(queryString.stringify(params)).toUpperCase();
}

export {
  AXIOS_HTTP_TIMEOUT,
  FAKE_HTTP_REQUEST_HASH,
  MAX_WAIT_MS,
  digest,
  hash,
  isHTTPGetMethod,
  isHttpResponseLike,
  isPromise,
  needsURLSearchParams,
  removeNullOrUndefinedProperties,
};
export type {
  AfterReturningMiddleware,
  AsyncAfterReturningMiddleware,
  AsyncBeforeRequestMiddleware,
  BeforeRequestMiddleware,
  ExtraConfig,
  HttpMethod,
  IHttp,
  IHttpResponse,
  SyncAfterReturningMiddleware,
  SyncBeforeRequestMiddleware,
};

