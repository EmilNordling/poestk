import { CancelTokenSource, AxiosRequestConfig } from 'axios';

interface OptionConfiguration {
  cancelToken?: CancelTokenSource;
  requestConfig?: AxiosRequestConfig;
}

export class Options {
  public static default_request_config: AxiosRequestConfig = {
    headers: {},
  };

  public readonly cancel_token: CancelTokenSource | null = null;
  public readonly request_config: AxiosRequestConfig;

  constructor({ requestConfig, cancelToken }: OptionConfiguration) {
    this.cancel_token = cancelToken ?? null;
    this.request_config = requestConfig ?? Options.default_request_config;
  }
}
