// Todo move IHttpService and HttpMockClient to one-atom repo

export type Payload = null | string | number | Record<string, unknown>;

export type HttpResponse<T> = Promise<T>;

export interface Mock<T = unknown> {
  data: T;
  status?: number;
}

export interface HttpServiceOption {
  readonly throttle?: number;
  readonly mock?: Mock;
}

export enum Methods {
  Get = 'GET',
  Delete = 'DELETE',
  Post = 'POST',
  Put = 'PUT',
}

export interface IHttpService {
  get<T>(url: string, option?: HttpServiceOption): Promise<T>;
  delete<T>(url: string, option?: HttpServiceOption): Promise<T>;
  post<T>(url: string, body: Payload, option?: HttpServiceOption): Promise<T>;
  put<T>(url: string, body: Payload, option?: HttpServiceOption): Promise<T>;
}
