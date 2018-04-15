import { v4 } from 'uuid';
import NodeData from './NodeData';
import TreeData from './TreeData';
import ClientStore from './ClientStore';
import Emitter from '../Emitter';
import { decodeHash } from '../hashShim';

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

  changeClass(changeTo, destructive = false, newFrame = false) {
    if (destructive) this.currentTabData.allocated = {};

    switch (changeTo) {
      case 0:
        this.currentTabData.allocated[58833] = this.NodeData.nodes[58833];
        break;
      case 1:
        this.currentTabData.allocated[47175] = this.NodeData.nodes[47175];
        break;
      case 2:
        this.currentTabData.allocated[50459] = this.NodeData.nodes[50459];
        break;
      case 3:
        this.currentTabData.allocated[54447] = this.NodeData.nodes[54447];
        break;
      case 4:
        this.currentTabData.allocated[50986] = this.NodeData.nodes[50986];
        break;
      case 5:
        this.currentTabData.allocated[61525] = this.NodeData.nodes[61525];
        break;
      case 6:
        this.currentTabData.allocated[50459] = this.NodeData.nodes[50459];
        break;
      default:
        throw new Error('invalid');
    }

    this.currentTabData.startClass = changeTo;

    if (newFrame) this.newFrameID();
  }

  newFrameID() {
    this.frameID = v4();

    Emitter.emit('draw');
  }

  clearPassives() {
    this.currentTabData.allocated = {};
    this.changeClass(this.currentTabData.startClass);

    this.newFrameID();
  }

  async updatePassive(hashstring) {
    try {
      const decoded = await decodeHash(hashstring);

      this.currentTabData.startClass = decoded.startClass;
      this.currentTabData.ascendancy = decoded.ascendancy;
      this.currentTabData.allocated = decoded.allocated.reduce((obj, node) => {
        obj[node] = this.NodeData.getNode(node);

        return obj;
      }, {});

      this.changeClass(this.currentTabData.startClass);
      this.newFrameID();

      localStorage.setItem('link', hashstring);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new Controller();
