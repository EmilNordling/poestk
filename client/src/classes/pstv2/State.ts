import { MatrixPoint } from './render/Scene';

interface Tab {
  startClass: number;
  ascendancy: number;
  allocated: {};
}

class State {
  public isHovering: MatrixPoint<PassiveNode> | null;
  public chunkData = null;
  public activeCoords = null;
  public activeCoordsData = null;
  public tabs: { [key: string]: Tab } = {};
  public tabCount = 0;
  public selectedTab: string | null = null;
}

export default new State();
