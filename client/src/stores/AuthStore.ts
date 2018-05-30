import Axios from 'axios';
import { observable, action } from 'mobx';
import userStore from './UserStore';
import commonStore from './CommonStore';
import { APIRoot } from '../agent';

class AuthStore {
  @observable inProgress = false;
  @observable errors = undefined;
  @observable values = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  @action setUsername(username: string) {
    this.values.username = username;
  }

  @action setEmail(email: string) {
    this.values.email = email;
  }

  @action setPassword(password: string) {
    this.values.password = password;
  }

  @action setPasswordConfirm(password: string) {
    this.values.passwordConfirm = password;
  }

  @action reset() {
    this.values.username = '';
    this.values.email = '';
    this.values.password = '';
  }

  @action async login(callback: Function) {
    this.inProgress = true;
    this.errors = undefined;

    const { email, password } = this.values;

    try {
      const { data } = await Axios.post(`${APIRoot}/users/login`, { user: { email, password } });

      commonStore.setToken(data.user.token);

      await userStore.pullUser();

      this.inProgress = false;
      callback.call(this);
    } catch (error) {
      this.inProgress = false;

      throw error;
    }
  }

  @action async register(callback: Function) {
    this.inProgress = true;
    this.errors = undefined;

    const { username, email, password, passwordConfirm } = this.values;

    try {
      const { data } = await Axios.post(`${APIRoot}/users`, { user: { username, email, password, passwordConfirm } });

      commonStore.setToken(data.user.token);

      console.log(data.user.token)
      await userStore.pullUser();

      this.inProgress = false;
      callback.call(this);
    } catch(error) {
      this.inProgress = false;
      this.errors = error.response && error.response.body && error.response.body.errors;

      throw error;
    }
  }

  @action logout() {
    commonStore.setToken(undefined);
    userStore.forgetUser();

    return Promise.resolve();
  }
}

export default new AuthStore();
