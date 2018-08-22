class Group {
  id: any;
  x: any;
  y: any;
  occupiedOrbits: any;
  nodes = {};
  isAscendancy = false;
  ascendancyName = false;
  oldPos = false;

  constructor(id, position, occupiedOrbits) {
    this.id = id;
    this.x = position.x;
    this.y = position.y;
    this.occupiedOrbits = occupiedOrbits;
  }

  set addNode(node) {
    this.nodes[node.id] = node;

    node.setGroup = this.id;
  }

  get getId() {
    return this.id;
  }

  foreachNode(callback) {
    Object.keys(this.nodes).forEach((key) => {
      callback.call(this, this.nodes[key]);
    });
  }
}

export default Group;
