import { HttpBase } from "./http-base";
import type { ExtraConfig, IHttp, IHttpResponse } from "./types";

class HttpApi extends HttpBase implements IHttp {
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

export { HttpApi };
