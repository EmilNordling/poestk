import { MatrixPoint } from './render/Scene';
import Emitter from './Emitter';
import { encodeTree } from './hashShim';
import { decodeTree } from './hashShim';
import Graph from './parser/Graph';

interface Assets {
  skills: HTMLImageElement;
}

interface Tab {
  name: string;
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

  public changeClass(changeTo: number, destructive = false, newFrame = false) {
    if (!this.selectedTab) return;

    const tab = this.tabById(this.selectedTab);

    if (!tab) return;

    if (destructive) tab.allocated = {};

    switch (changeTo) {
      case 0:
        tab.allocated[58833] = Graph.nodes[58833];
        break;
      case 1:
        tab.allocated[47175] = Graph.nodes[47175];
        break;
      case 2:
        tab.allocated[50459] = Graph.nodes[50459];
        break;
      case 3:
        tab.allocated[54447] = Graph.nodes[54447];
        break;
      case 4:
        tab.allocated[50986] = Graph.nodes[50986];
        break;
      case 5:
        tab.allocated[61525] = Graph.nodes[61525];
        break;
      case 6:
        tab.allocated[44683] = Graph.nodes[44683];
        break;
      default:
        throw new Error('invalid');
    }

    tab.startClass = changeTo;

    if (newFrame) this.redraw();
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
