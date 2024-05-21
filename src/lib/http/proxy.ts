"use client";

import { HttpBase } from "./http-base";
import type { ExtraConfig, IHttp, IHttpResponse } from "./types";

/**
 * Http Client 4 Browser side to call NextJS /api/proxy ( which is a proxy 4 real astrostar api endpoints )
 */
class HttpProxy extends HttpBase implements IHttp {
  async get<T = unknown>(
    url: string,
    parameters: Record<string, unknown> = {},
    extraConfig: ExtraConfig = {}
  ): Promise<IHttpResponse<T>> {
    return await this.call<T>(
      "POST",
      "",
      {
        ...parameters,
        _meta: {
          apiEndpoint: url,
          extraConfig,
          method: "GET",
        },
      },
      extraConfig
    );
  }

  async delete<T = unknown>(
    url: string,
    parameters: Record<string, unknown> = {},
    extraConfig: ExtraConfig = {}
  ): Promise<IHttpResponse<T>> {
    return await this.call<T>(
      "POST",
      "",
      {
        ...parameters,
        _meta: {
          apiEndpoint: url,
          extraConfig,
          method: "DELETE",
        },
      },
      extraConfig
    );
  }

  async patch<T = unknown>(
    url: string,
    parameters: Record<string, unknown> = {},
    extraConfig: ExtraConfig = {}
  ): Promise<IHttpResponse<T>> {
    return await this.call<T>(
      "POST",
      "",
      {
        ...parameters,
        _meta: {
          apiEndpoint: url,
          extraConfig,
          method: "PATCH",
        },
      },
      extraConfig
    );
  }

  async post<T = unknown>(
    url: string,
    parameters: Record<string, unknown> = {},
    extraConfig: ExtraConfig = {}
  ): Promise<IHttpResponse<T>> {
    return await this.call<T>(
      "POST",
      "",
      {
        ...parameters,
        _meta: {
          apiEndpoint: url,
          extraConfig,
          method: "POST",
        },
      },
      extraConfig
    );
  }

  async put<T = unknown>(
    url: string,
    parameters: Record<string, unknown> = {},
    extraConfig: ExtraConfig = {}
  ): Promise<IHttpResponse<T>> {
    return await this.call<T>(
      "POST",
      "",
      {
        ...parameters,
        _meta: {
          apiEndpoint: url,
          extraConfig,
          method: "PUT",
        },
      },
      extraConfig
    );
  }
}

export { HttpProxy };
