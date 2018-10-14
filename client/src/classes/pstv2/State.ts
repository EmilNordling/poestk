import { MatrixPoint } from './render/Scene';
import Emitter from './Emitter';
import { encodeTree } from './hashShim';
import { decodeTree } from './hashShim';
import Graph from './parser/Graph';

interface Assets {
  skills: HTMLImageElement;
}

interface Tab {
  name: string,
  startClass: number;
  ascendancy: number;
  allocated: {};
}

class State {
  public isHovering: MatrixPoint<PassiveNode> | null;
  public chunkData = null;
  public activeCoords = null;
  public activeCoordsData = null;
  public assets: Assets;
  public isLoaded = false;

  public tabs: { [key: string]: Tab } = {};
  public tabCount = 0;
  public selectedTab: TabGuid | null = null;
  private treeHash: TreeHash | null = null;

  public get currentTab(): null | Tab {
    if (this.selectedTab === null) return null;

    return this.tabs[this.selectedTab];
  }

  // TODO: make tab its own class, removes unrelated methods from this class
  public tabById(tabId: TabGuid): null | Tab {
    const tab = this.tabs[tabId];

    if (tab === null) return null;

    return tab;
  }

  public isCurrentTab(tabId: TabGuid) {
    return tabId === this.selectedTab;
  }

  public reset() {

  }

  public changeClass(character: number) {

  }

  public redraw() {
    Emitter.emit('draw');
  }

  public getTreeHash() {
    return '';
  }

  public async encodeTree(hash: string) {

  }

  public async decodeTree(hash: string, tabId: TabGuid, draw = true) {
    try {
      const tab = this.tabById(tabId);

      if (tab === null) throw new Error(`Can't read tab data`);

      const decoded = await decodeTree(hash);

      tab.startClass = decoded.startClass;
      tab.ascendancy = decoded.ascendancy;
      tab.allocated = decoded.allocated.reduce((obj, node) => {
        obj[node] = Graph.nodes[node];

        return obj;
      }, {});

      this.changeClass(tab.startClass);

      if (this.isCurrentTab(tabId) && draw) {
        this.redraw();
      }

      localStorage.setItem('link', hash);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new State();
