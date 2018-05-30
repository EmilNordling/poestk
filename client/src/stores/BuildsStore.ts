import { observable, action, reaction, computed } from 'mobx';
import Axios from 'axios';
import { APIRoot } from '../agent';
import commonStore from './CommonStore';

class BuildsStore {
  @observable inProgress = false;
  @observable errors = undefined;
  @observable builds = observable.map();

  @action async createBuild(model: any) {
    this.inProgress = true;
    this.errors = undefined;

    try {
      const { data } = await Axios.post(`${APIRoot}/builds`, { build: model }, { headers: {'authorization': `Token ${commonStore.token}`} });

      console.log(data)
    } catch(error) {
      this.inProgress = false;
      this.errors = error.response && error.response.body && error.response.body.errors;

      throw error;
    }
  }
}

export default new BuildsStore();
