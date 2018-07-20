import { theme } from '../utils/constants';

class ClientStore {
  parent = undefined;
  tileSize = 256;
  viewTab = 0;
  isMoving = false;
  activeCoords = undefined;
  activeCoordsData = undefined;
  isHovering = false;
  treeState = [
    {
      startClass: 1,
      ascendancy: 0,
      allocated: {},
    },
  ];
  theme = theme.dark;

  get tab() {
    return this.viewTab;
  }
}

export default ClientStore;
