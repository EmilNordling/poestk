import { Singleton } from 'one-atom';
import { HttpService } from '../http.service/mod';
import { UserModel } from './models/user_model';
import { ApiControllerBase } from './_api_controller_base';

@Singleton()
export class AuthApiService extends ApiControllerBase {
  constructor(private readonly httpService: HttpService) {
    super('auth');
  }

  public get(): Promise<UserModel> {
    const url = this.controller;

    if (process.env.NODE_ENV !== 'production' && HttpService.mocking) {
      return this.httpService.mock().get(url, {
        id: 'a676947e-9ad8-42d7-976a-42c8142a3541',
        isEmployee: false,
        name: 'mathil',
        email: 'peostk@poestk.com',
      });
    }

    return this.httpService.get(url);
  }
}
