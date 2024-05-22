import {
  api,
  type ExtraConfig,
  type HttpConfig,
  type HttpMethod,
  type IHttp,
  type IHttpResponse,
} from "@/lib/http";

class HttpProxy implements IHttp {
  async call<T = unknown>(
    method: HttpMethod,
    url: string,
    parameters: Record<string, unknown> = {},
    extraConfig: ExtraConfig = {}
  ): Promise<IHttpResponse<T>> {
    console.log("HttpProxy");

    const apiConfig = {} as HttpConfig;
    const config = {
      withCredentials: true,
      ...extraConfig,
    };

    return await api("/api", apiConfig).call<T>(
      method,
      url,
      parameters,
      config
    );
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

const ossRouteHandler = new HttpProxy();

export { ossRouteHandler };
