import { observable } from 'mobx';

export default class GUIStore {
  @observable showSWUpdated = false;
  @observable isHovering = false;
}
