import { observable, action, reaction, computed } from 'mobx';
import auth, { RegisterResponse, LoginResponse, UpdateResponse } from '../services/auth';
import official from '../services/official';
import Register from '../pages/register/Register';

export default class AuthStore {
  @observable public loading = false;
  @observable public currentUser: any | null = null;
  @observable public errors: any = null;
  @observable private _token = window.localStorage.getItem('jwt');

  @computed public get authenticated(): boolean {
    return !!this._token;
  }

  public get token() {
    return this._token;
  }

  public set token(token: string | null) {
    this._token = token;
  }

  constructor() {
    reaction(() => this.token, (token) => {
      if (token) {
        window.localStorage.setItem('jwt', token);
      } else {
        window.localStorage.removeItem('jwt');
      }
    });
  }

  @action public async login(builder: LoginResponse.builder, callback: Function) {
    this.loading = true;

    try {
      const { data } = await auth.login(builder);

      this.token = data.user.token;

      await this.pullUser();

      this.loading = false;
      callback.call(this);
    } catch (error) {
      this.loading = false;
      this.errors = error.response && error.response.body && error.response.body.errors;
    }
  }

  @action public async register(builder: RegisterResponse.builder, callback?: Function) {
    this.loading = true;

    try {
      const { data } = await auth.register(builder);

      this.token = data.user.token;

      await this.pullUser();

      this.loading = false;

      if (typeof callback !== 'undefined') callback.call(this);
    } catch (error) {
      this.loading = false;
      this.errors = error.response && error.response.body && error.response.body.errors;
    }
  }

  @action public async update(builder: UpdateResponse.builder, callback?: Function) {
    if (!this.token) return;

    this.loading = true;

    try {
      const { data } = await auth.update(builder, this.token);

      console.log(data)
      // this.token = data.user.token;

      // await this.pullUser();

      // this.loading = false;
      // callback.call(this);
    } catch (error) {
      this.loading = false;
      this.errors = error.response && error.response.body && error.response.body.errors;
    }
  }

  @action public async pullUser() {
    if (this.token === null) return;

    this.loading = true;

    try {
      const { data } = await auth.pullUser(this.token);

      this.currentUser = data.user;

      this.loading = false;
    } catch (error) {
      this.loading = false;

      this.logout();
    }
  }

  @action public logout(): Promise<void> {
    this.token = null;
    this.currentUser = null;

    return Promise.resolve();
  }

  @action public async getCharacters(accountName: string) {
    try {
      const data = await official.getCharacters(accountName);

      console.log(data)
    } catch (error) {
      console.error(error);
    }
  }
}
