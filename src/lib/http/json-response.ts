import { type IHttpResponse } from "./types";

class JsonResponse {
  static create<T>(data: IHttpResponse<T>) {
    return data;
  }
}

export { JsonResponse };
