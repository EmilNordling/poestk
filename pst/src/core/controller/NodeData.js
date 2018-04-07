class NodeData {
  constructor() {
    this.nodes = {};
    this.groups = {};
  }

  /**
   * @param {string} id
   * @param {object} passive
   */
  addNode(id, passive) {
    this.nodes[id] = passive;
  }

  /**
   * @param {string} node
   */
  getNode(node) {
    return this.nodes[node];
  }

  /**
   * @param {object} passive
   */
  addGroup(passive) {
    this.groups[passive.getId()] = passive;
  }
}

export default NodeData;
