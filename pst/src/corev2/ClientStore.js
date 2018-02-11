class ClientStore {
  constructor() {
    this.parent = undefined;
    this.tileSize = 256;
    this.viewTab = 0;
    this.isMoving = false;
    this.activeCoords = undefined;
    this.activeCoordsData = undefined;
    this.isHovering = false;
    this.treeState = [
      {
        startClass: 3,
        ascendancy: 0,
        allocated: {},
      },
    ];
  }
}

export default new ClientStore();
