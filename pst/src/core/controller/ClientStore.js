import { theme } from '../utils/constants';

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
        startClass: 4,
        ascendancy: 0,
        allocated: {},
      },
    ];
    this.theme = theme.dark;
  }

  get tab() {
    return this.viewTab;
  }
}

export default ClientStore;
