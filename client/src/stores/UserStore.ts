import Axios from 'axios';
import { observable, action } from 'mobx';
import commonStore from './CommonStore';
import { APIRoot } from '../agent';

class UserStore {
  @observable currentUser;
  @observable loadingUser = false;
  @observable updatingUser;
  @observable updatingUserErrors;

  @action forgetUser(): void {
    this.currentUser = undefined;
  }

  @action async pullUser() {
    this.loadingUser = true;

    try {
      const { data } = await Axios.get(`${APIRoot}/user`, { headers: {'authorization': `Token ${commonStore.token}`} });

      this.currentUser = data.user;
      this.loadingUser = false;
    } catch(error) {
      this.loadingUser = false;
    }
  }
}

export default new UserStore();
