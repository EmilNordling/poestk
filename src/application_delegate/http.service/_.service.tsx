import { Singleton, Timer } from 'one-atom';
import { HttpOption } from './_http_option';
import { HttpMockClient } from './_http_mock_client';
import { HttpServiceOption, Methods, IHttpService, Payload } from './_http';

@Singleton()
export class HttpService implements IHttpService {
  public static mocking = process.env.NODE_ENV === 'test' || process.env.CUSTOM_GLOBAL_ENV.mock;

  public get<T>(url: string, option?: HttpServiceOption): Promise<T> {
    return this.send(Methods.Get, url, option ?? new HttpOption<T>());
  }

  public delete<T>(url: string, option?: HttpServiceOption): Promise<T> {
    return this.send(Methods.Delete, url, option ?? new HttpOption<T>());
  }

  public post<T>(url: string, body: Payload, option?: HttpServiceOption): Promise<T> {
    return this.send(Methods.Post, url, option ?? new HttpOption<T>(), body);
  }

  public put<T>(url: string, body: Payload, option?: HttpServiceOption): Promise<T> {
    return this.send(Methods.Put, url, option ?? new HttpOption<T>(), body);
  }

  public mock(): HttpMockClient {
    return new HttpMockClient(this);
  }

  private interceptBeforeGoingToRequester(response: Response): Response {
    // This function only exists if we'd want to do something with the response
    // data. Reading headers to set sessions etc
    return response;
  }

  private async send<T>(method: Methods, url: string, option: HttpServiceOption, body?: Payload): Promise<T> {
    let response: Response;

    if (option.mock) {
      if (process.env.NODE_ENV === 'production') throw new Error('Http mocking is only allowed in development and test environments');

      const blob = new Blob([JSON.stringify(option.mock.data, null)], { type: 'application/json' });
      response = new Response(blob, { status: option.mock.status ?? 200 });
    } else {
      if (body) {
        response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        response = await fetch(url, {
          method,
        });
      }
    }

    if (option.throttle) {
      const throttleDuration = option.throttle;
      await new Promise((resolve) => {
        Timer.wait(resolve, throttleDuration);
      });
    }

    const mutatedResponse = this.interceptBeforeGoingToRequester(response);

    let data: unknown = null;
    if (mutatedResponse.body !== null) {
      data = await mutatedResponse.json();
    }

    return data as T;
  }
}
