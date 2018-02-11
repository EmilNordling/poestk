import Passive from './Passive';
import Emitter from './Emitter';
import Group from './Group';
import minX from '../treeData/min_x.json';
import minY from '../treeData/min_y.json';

class NodeData {
  constructor() {
    this.nodes = {};
    this.groups = {};
  }

  async load(callback) {
    await fetch('/treeData/nodeData.json')
      .then(res => res.json())
      .then(response => this.initGraph(response), error => callback.call(this, error));
  }

  initGraph(response) {
    response.nodes.map(node => this.addNode(node));

    Object.keys(response.groups).forEach((key) => {
      const entry = response.groups[key];

      entry.x += -minX;
      entry.y += -minY;

      const group = new Group(key, { x: entry.x, y: entry.y }, entry.oo);

      for (let e = 0, t = entry.n.length; e < t; e += 1) {
        const node = this.getNode(entry.n[e]);
        if (node.isAscendancy) {
          group.isAscendancy = true;
          group.ascendancyName = node.ascendancyName;
        }

        group.addNode = node;
      }

      this.groups[group.id] = group;
    });

    Emitter.emit('nodesLoaded');
  }

  addNode(node) {
    this.nodes[node.id] = new Passive(node);
  }

  getNode(node) {
    return this.nodes[node];
  }

  addGroup(node) {
    this.groups[node.getId()] = node;
  }
}

export default new NodeData();
