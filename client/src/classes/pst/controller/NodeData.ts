class NodeData {
  nodes = {};
  groups = {};

  addNode(id: string, passive: any) {
    this.nodes[id] = passive;
  }

  getNode(node: string) {
    return this.nodes[node];
  }

  addGroup(passive: any) {
    this.groups[passive.getId()] = passive;
  }
}

export default NodeData;
