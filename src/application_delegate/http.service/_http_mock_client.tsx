import { HttpOption } from './_http_option';
import { HttpResponse, HttpServiceOption, IHttpService } from './_http';
import { _mockedResponseData } from './mockResponse';

export class HttpMockClient {
  constructor(private readonly realClientRef: IHttpService) {
    // Empty
  }

  public get<T>(url: string, data: T, option?: HttpServiceOption): HttpResponse<T> {
    return this.passHttpFn(this.realClientRef.get.bind(this.realClientRef), url, data, false, option);
  }

  public delete<T>(url: string, data?: T, option?: HttpServiceOption): HttpResponse<T> {
    return this.passHttpFn(this.realClientRef.delete.bind(this.realClientRef), url, data, false, option);
  }

  public post<T>(url: string, data?: T, option?: HttpServiceOption): HttpResponse<T> {
    return this.passHttpFn(this.realClientRef.post.bind(this.realClientRef), url, data, true, option);
  }

  public put<T>(url: string, data?: T, option?: HttpServiceOption): HttpResponse<T> {
    return this.passHttpFn(this.realClientRef.put.bind(this.realClientRef), url, data, true, option);
  }

  private passHttpFn<T>(
    fn:
      | HttpMockClient['realClientRef']['get']
      | HttpMockClient['realClientRef']['delete']
      | HttpMockClient['realClientRef']['post']
      | HttpMockClient['realClientRef']['put'],
    url: string,
    data: T | undefined,
    hasBody: boolean,
    option?: HttpServiceOption,
  ): HttpResponse<T> {
    const storedData = this.exhaustMockResponse<T>(url);
    data = storedData !== null ? storedData : data;

    if (data === undefined) {
      throw new Error('No mock data to be found, its possible that the stored request has already been exhausted');
    }

    const badUrl = '_'; // Incase this would actually try send a real request
    const optionOverride = new HttpOption({
      mock: {
        data,
      },
      throttle: option?.throttle,
    });

    // If it's "post" or "put" a body is required for these function calls
    if (hasBody) {
      return (fn as HttpMockClient['realClientRef']['post'] | HttpMockClient['realClientRef']['put'])<T>(badUrl, null, optionOverride);
    }

    return (fn as HttpMockClient['realClientRef']['get'] | HttpMockClient['realClientRef']['delete'])<T>(badUrl, optionOverride);
  }

  private exhaustMockResponse<T>(key: string): T | null {
    if (_mockedResponseData[key]) {
      const response = _mockedResponseData[key] as T;
      delete _mockedResponseData[key];

      return response;
    }

    return null;
  }
}
