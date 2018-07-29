import { observable, computed, action } from 'mobx';
import { changeClass } from '../classes/pst/publicAPI';
import getNewCharacter, { VirutalCharacter, updateStat } from '../classes/calc/virutalCharacter';
import { renderer, loader } from '../classes/pst';
import { Characters } from '../classes/pst/characters';
import Emitter from '../classes/pst/Emitter';
import { parseTreeData, TreeDataNode } from '../classes/calc/parseData';
import { AllocationEmitState } from '../classes/pst/AllocationObservable';

type builds = {
  [build: string]: VirutalCharacter;
};

export default class BuildStore {
  @observable public loading = true;
  @observable public currentTab = 0;
  public nodes: Array<TreeDataNode> = [];
  public builds: builds = {};

  @observable private _activeBuild: VirutalCharacter;
  @computed public get activeBuild() {
    return this._activeBuild;
  }
  public set activeBuild(activeBuild: VirutalCharacter) {
    this._activeBuild = activeBuild;
  }

  constructor() {
    Emitter.on('allocated', this.fromTree);
    Emitter.on('deallocated', this.fromTree);
  }

  @action
  public async load(mountIn: HTMLElement) {
    if (mountIn === null) return;

    if (!this.activeBuild) {
      await loader.start();

      this.newCharacter(Characters.scion, false);

      this.loading = false;
    }

    renderer.mountCanvas(mountIn);
  }

  @action
  public change = (value: string, model: string) => {
    switch (model) {
      case 'selectedClass':
        this.newCharacter(parseInt(value, 10));
        break;
      case 'selectedAscendancy':
        console.log(value);
        break;
      case 'bandit':
        console.log(value);
        break;
    }
  }

  // TODO: add support for bulk update
  @action
  public fromTree = (node: PassiveNode, type: AllocationEmitState) => {
    if (typeof node.sd === 'undefined') return;

    if (type === AllocationEmitState.allocate) {
      const nodeProperties: TreeDataNode = {
        index: node.id,
        data: [],
      };

      Object.keys(node.sd).forEach((modiferKey) => nodeProperties.data.push(parseTreeData(modiferKey, node.sd![modiferKey])));

      this.nodes.push(nodeProperties);

      this.activeBuild = updateStat(this.activeBuild, nodeProperties);
    } else {
      const index = this.nodes.findIndex(x => x.index === node.id);

      if (index > -1) {
        const removedNode = this.nodes.splice(index, 1);

        this.activeBuild = updateStat(this.activeBuild, removedNode[0], true);
      }
    }
  }

  private newCharacter(character: Characters, destructive = true) {
    changeClass(character, destructive, destructive);
    this.builds[this.currentTab] = getNewCharacter(character);
    this.activeBuild = this.builds[this.currentTab];
  }
}
