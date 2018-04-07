class Passive {
  constructor(node) {
    // temp tab 0
    this.tab = {
      0: {},
    };
    this.connection = {};
    Object.keys(node).forEach((key) => {
      this[key] = node[key];
    });
  }

  /**
   * @return {number}
   */
  get getID() {
    return this.id;
  }

  /**
   * @param {number} groupID
   */
  set setGroup(groupID) {
    this.groupID = groupID;
  }

  /**
   * @param {object} node
   */
  addOutNode(node) {
    this.outNodes[node.getID()] = node;

    node.addInNode(this);
  }

  /**
   * @param {object} node
   */
  addInNode(node) {
    this.inNodes[node.getID()] = node;
  }

  foreachOutNode(callback) {
    if (!this.out) return;

    this.out.map(node => callback.call(this, node));
  }

  foreachConnection(callback) {
    if (!this.connection) return;

    Object.keys(this.connection).map(node => callback.call(this, node))
  }
}

export default Passive;
