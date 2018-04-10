import { v4 } from 'uuid';
import NodeData from './NodeData';
import TreeData from './TreeData';
import ClientStore from './ClientStore';
import Emitter from '../Emitter';

class Controller {
  constructor() {
    this.NodeData = new NodeData();
    this.TreeData = new TreeData();
    this.ClientStore = new ClientStore();
    this.frameID = v4();
  }

  get currentTabData() {
    return this.ClientStore.treeState[this.ClientStore.tab];
  }

  changeClass(changeTo) {
    switch (changeTo) {
      case 3:
        this.ClientStore.treeState[this.ClientStore.tab].allocated[58833] = this.NodeData.nodes[58833];
        break;
      default:
        break;
    }
  }

  newFrameID() {
    this.frameID = v4();

    Emitter.emit('draw');

    return this.frameID;
  }

  clearPassives() {
    this.ClientStore.treeState[this.ClientStore.tab].allocated = {};
    this.changeClass(this.currentTabData.startClass);
    this.newFrameID();
  }
}

export default new Controller();
