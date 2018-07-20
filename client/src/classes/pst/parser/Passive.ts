class Passive {
  tab: any;
  id: number;
  groupID: number;
  outNodes: any;
  connection = {};

  constructor(node: PassiveNode) {
    // temp tab 0
    this.tab = {
      0: {},
    };
    Object.keys(node).forEach((key) => {
      this[key] = node[key];
    });
  }

  get getID() {
    return this.id;
  }

  set setGroup(groupID) {
    this.groupID = groupID;
  }
}

export default Passive;
