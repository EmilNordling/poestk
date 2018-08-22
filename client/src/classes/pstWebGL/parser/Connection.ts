import PassiveNode from './PassiveNode';

class Connection {
  points: { a: PassiveNode, b: PassiveNode };
  tab = {
    0: {
      headingTo: undefined,
    },
  };

  constructor(a, b) {
    this.points = { a, b };
  }
}

export default Connection;
