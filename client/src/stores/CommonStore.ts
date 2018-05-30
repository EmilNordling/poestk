import { observable, action, reaction, computed } from 'mobx';
import userStore from './userStore';

class CommonStore {
  @observable token = window.localStorage.getItem('jwt');
  @observable appLoaded = false;

  constructor() {
    reaction(
      () => this.token,
      token => {
        if (token) {
          window.localStorage.setItem('jwt', token);
        } else {
          window.localStorage.removeItem('jwt');
        }
      }
    );
  }

  @computed get authenticated() {
    return !!this.token
  }

  @action setToken(token: string | undefined) {
    this.token = token;
  }

  @action setAppLoaded() {
    this.appLoaded = true;
  }

}

export default new CommonStore();
