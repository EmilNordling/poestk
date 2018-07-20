import Axios, { AxiosPromise } from 'axios';
import { APIRoot, headers } from './';

export declare module LoginResponse {
  export type builder = {
    email: string,
    password: string,
  };

  export type response = {
    user: any,
  };
}

export declare module RegisterResponse {
  export type builder = {
    username: string,
    email: string,
    password: string,
    passwordConfirm: string,
  };

  export type response = {
    user: any,
  };
}

export declare module pullUserResponse {
  export type response = {
    user: any,
  };
}

const invokeRequest = async (request: AxiosPromise) => {
  const data = await request;
};

const API = {
  pullUser: (token: string): AxiosPromise<pullUserResponse.response> => Axios.get(`${APIRoot}/user`, headers(token)),
  login: (model: LoginResponse.builder): AxiosPromise<RegisterResponse.response> => Axios.post(`${APIRoot}/users/login`, { user: model }),
  register: (model: RegisterResponse.builder): AxiosPromise<RegisterResponse.response> => Axios.post(`${APIRoot}/users`, { user: model }),
};

export default API;
