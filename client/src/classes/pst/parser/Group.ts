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

  /**
   * @param {string} STRING
   * @param {number} place
   */
  set addNode(node) {
    this.nodes[node.getID] = node;

    node.setGroup = this.id;
  }

  /**
  * @return {number}
  */
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
