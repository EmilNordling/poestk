/* eslint-disable @typescript-eslint/ban-ts-comment */
import Axios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Options } from './options';

namespace Http {
  // eslint-disable-next-line prefer-const
  export let client: AxiosInstance | null = null;
  export type Payload = null | string | number | Record<string, unknown>;

  export async function send<T>(
    fn: typeof Axios.get | typeof Axios.delete | typeof Axios.post | typeof Axios.put,
    url: string,
    options: Options,
    body?: null | string | number | Record<string, unknown>,
  ): Promise<AxiosResponse<T>> {
    let response: AxiosResponse<T>;

    if (body === undefined) {
      response = await (fn as typeof Axios.get | typeof Axios.delete)(url, {
        ...options.request_config,
        cancelToken: options.cancel_token?.token ?? Axios.CancelToken.source().token,
      });
    } else {
      response = await (fn as typeof Axios.post | typeof Axios.put)(
        url,
        // @ts-ignore
        body instanceof FormData ? body : JSON.stringify(body),
        {
          ...options.request_config,
          cancelToken: options.cancel_token?.token ?? Axios.CancelToken.source().token,
        },
      );
    }

    return response;
  }
}

export const httpClient = {
  get<T>(url: string, option_configuration?: Options): Promise<AxiosResponse<T>> {
    return Http.send<T>(Http.client ?? Axios.get, url, option_configuration ?? new Options({}));
  },
  delete<T>(url: string, option_configuration?: Options): Promise<AxiosResponse<T>> {
    return Http.send<T>(Http.client ?? Axios.delete, url, option_configuration ?? new Options({}));
  },
  post<T>(url: string, body: Http.Payload, option_configuration?: Options): Promise<AxiosResponse<T>> {
    return Http.send<T>(Http.client ?? Axios.post, url, option_configuration ?? new Options({}), body);
  },
  put<T>(url: string, body: Http.Payload, option_configuration?: Options): Promise<AxiosResponse<T>> {
    return Http.send<T>(Http.client ?? Axios.put, url, option_configuration ?? new Options({}), body);
  },
  create(config: AxiosRequestConfig): void {
    Http.client = Axios.create(config);
  },
};
