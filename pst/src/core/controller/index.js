import NodeData from './NodeData';
import TreeData from './TreeData';
import ClientStore from './ClientStore';

class Controller {
  constructor() {
    this.NodeData = new NodeData();
    this.TreeData = new TreeData();
    this.ClientStore = new ClientStore();
  }

  get nodeData() {
    return this.NodeData;
  }

  get treeData() {
    return this.TreeData;
  }

  get clientStore() {
    return this.TreeData;
  }
}

export default new Controller();
