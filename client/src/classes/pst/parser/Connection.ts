class Connection {
  points = {
    a: null,
    b: null,
  };
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
