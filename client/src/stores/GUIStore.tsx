import { observable, action, computed } from 'mobx';
import Modal from '../components/Modal';


export default class GUIStore {
  @observable public modals: Modal[] = [];
  @observable public showSWUpdated = false;
  @observable public isHovering = false;

  @action public addModal(ModalComponent: Modal) {
    this.modals.push(ModalComponent);
  }

  @action public popModal() {
    this.modals.pop();
  }

  @computed get modal() {
    return this.modals[0];
  }
}
