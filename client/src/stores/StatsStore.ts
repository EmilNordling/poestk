import { observable, computed, values } from 'mobx';
import Emitter from '../classes/pst/Emitter';
import { parseTreeData } from '../classes/calc/parseData';

class Group {
  public allocationRegistry = observable.map<string, string>();

  @computed public get allocationState() {
    return values(this.allocationRegistry);
  }
}

export default class StatsStore {
  constructor() {
    // Emitter.on('allocated', (node: PassiveNode) => parseTreeData(node));
    // Emitter.on('deallocated', (node: PassiveNode) => parseTreeData(node));
  }
}
