// TODO: add bounds
class Connection {
  constructor(a, b) {
    this.points = { a, b };
    this.tab = {
      0: {
        headingTo: undefined,
      },
    };
  }
}

export default Connection;
