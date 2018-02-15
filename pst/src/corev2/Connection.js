// TODO: add bounds
class Connection {
  constructor(a, b) {
    this.headingTo = undefined;
    this.points = { a, b };
    this.tab = {
      0: {},
    };
  }
}

export default Connection;
