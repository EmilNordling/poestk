import PassiveNode from './PassiveNode';

let id = 0;

class Connection {
  public points: { a: PassiveNode, b: PassiveNode };
  public tab = {
    0: {
      headingTo: undefined,
    },
  };
  public id = id++;

  constructor(a, b) {
    this.points = { a, b };
  }
}

export default Connection;
