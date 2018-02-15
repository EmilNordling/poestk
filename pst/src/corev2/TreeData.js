class TreeData {
  constructor() {
    this.matrix = {};
    this.tileSize = 2048;
    this.length = 19877;
    this.height = 16120;
    this.maxTileX = this.length / this.tileSize;
    this.maxTileY = this.height / this.tileSize;

    const gridX = Math.ceil(this.maxTileX);
    const gridY = Math.ceil(this.maxTileY);

    for (let x = 0; x < gridX; x += 1) {
      for (let y = 0; y < gridY; y += 1) {
        const matrixID = `${x}/${y}`;

        this.matrix[matrixID] = {
          nodes: [],
          connections: [],
        };
      }
    }
  }

  static get getMatrix() {
    return this.matrix;
  }

  getTiles(startX, startY, endX, endY) {
    let returnedData = {
      nodes: [],
      connections: [],
    };

    if (endX && endY) {
      for (let x = startX; x < endX; x += 1) {
        for (let y = startY; y < endY; y += 1) {
          if (`${x}/${y}` in this.matrix) {
            returnedData.nodes.push(...this.matrix[`${x}/${y}`].nodes);
            returnedData.connections.push(...this.matrix[`${x}/${y}`].connections);
          }
        }
      }

      return returnedData;
    }

    returnedData = this.matrix[`${startX}/${startY}`] || returnedData;

    return returnedData;
  }
}

export default new TreeData();
