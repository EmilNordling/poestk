class Group {
  constructor(id, position, occupiedOrbits) {
    this.id = id;
    this.x = position.x;
    this.y = position.y;
    this.nodes = {};
    this.occupiedOrbits = occupiedOrbits;
    this.isAscendancy = false;
    this.ascendancyName = false;
    this.oldPos = false;
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

  isOccupiedOrbit(node) {
    return this.occupiedOrbits[node] !== undefined;
  }

  isAscendancy() {
    return this.isAscendancy;
  }

  getAscendancy() {
    return this.ascendancyName;
  }
}

export default Group;
