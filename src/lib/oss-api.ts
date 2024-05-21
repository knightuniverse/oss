import {
  api,
  type ExtraConfig,
  type HttpConfig,
  type HttpMethod,
  type IHttp,
  type IHttpResponse,
} from "@/lib/http";
import { isNil } from "lodash-es";
import { cache } from "./cache";
import { CK_TOKEN, SK_SUB } from "./constants";
import { Session } from "./session";

class HttpProxy implements IHttp {
  async call<T = unknown>(
    method: HttpMethod,
    url: string,
    parameters: Record<string, unknown> = {},
    extraConfig: ExtraConfig = {}
  ): Promise<IHttpResponse<T>> {
    console.log("Hoc");

    const apiConfig = {} as HttpConfig;
    const config = {
      ...extraConfig,
    };
    const session = await Session.create();
    const sub = session[SK_SUB];

    if (!isNil(sub)) {
      const access_token = await cache.getItem(`/${sub}/${CK_TOKEN}`);
      if (!isNil(access_token)) {
        // const headers = config.headers || {};
        // headers.authorization = `Bearer ${access_token}`;
        // config.headers = headers;
        apiConfig.token = access_token as string;
      }
    }

    const http = api(process.env.NEXT_PUBLIC_API_BASEURL, apiConfig);
    return await http.call<T>(method, url, parameters, config);
  }

  async get<T = unknown>(
    url: string,
    parameters: Record<string, unknown> = {},
    extraConfig: ExtraConfig = {}
  ): Promise<IHttpResponse<T>> {
    return this.call<T>("GET", url, parameters, extraConfig);
  }

  async delete<T = unknown>(
    url: string,
    parameters: Record<string, unknown> = {},
    extraConfig: ExtraConfig = {}
  ): Promise<IHttpResponse<T>> {
    return this.call<T>("DELETE", url, parameters, extraConfig);
  }

  async patch<T = unknown>(
    url: string,
    parameters: Record<string, unknown> = {},
    extraConfig: ExtraConfig = {}
  ): Promise<IHttpResponse<T>> {
    return this.call<T>("PATCH", url, parameters, extraConfig);
  }

  async post<T = unknown>(
    url: string,
    parameters: Record<string, unknown> = {},
    extraConfig: ExtraConfig = {}
  ): Promise<IHttpResponse<T>> {
    return this.call<T>("POST", url, parameters, extraConfig);
  }

  async put<T = unknown>(
    url: string,
    parameters: Record<string, unknown> = {},
    extraConfig: ExtraConfig = {}
  ): Promise<IHttpResponse<T>> {
    return this.call<T>("PUT", url, parameters, extraConfig);
  }
}

const ossApi = new HttpProxy();

export { ossApi };
