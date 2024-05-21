import { HttpApi } from "./api";
import type { HttpConfig } from "./http-base";

interface IHttpClientCtorInit {
  baseURL?: string;
  config?: HttpConfig;
}

function api(baseURL = "", config: HttpConfig = {}) {
  return new HttpApi(baseURL, config);
}

export { api };
export type { IHttpClientCtorInit };
