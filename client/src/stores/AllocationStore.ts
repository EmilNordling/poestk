import { observable, set, extendObservable, toJS } from 'mobx';
import Emitter from '../../../pst/src/core/Emitter';
import { reset, decodeTree, changeClass, redraw } from '../../../pst/src/core/publicAPI';
import { scheme } from '../../../mod';
import * as bundle from '../utils/bundleStats';

class Allocation {
  @observable boundle = [];
  @observable characterIndex: number = 0;
  private _bundle = new bundle.BundleStats(this.characterIndex);
  private _stats: any = {};
  private onAllocate: Function;
  private onDeallocate: Function;

  public get stats() {
    return this._stats;
  }

  constructor() {
    this.onAllocate = this.allocated.bind(this);
    this.onDeallocate = this.deallocated.bind(this);

    this.mountEvents();
  }

  public mountEvents() {
    Emitter.on('allocated', (this.onAllocate as any));
    Emitter.on('deallocated', (this.onDeallocate as any));
  }

  public unmountEvents() {
    Emitter.removeListener('allocated', (this.onAllocate as any));
    Emitter.removeListener('deallocated', (this.onDeallocate as any));
  }

  public boundleStats() {

  }

  private allocated(node: any) {
    Object.keys(node.sd).forEach((stat) => {
      if (stat in this._stats) {
        if (Array.isArray(this._stats[stat].value)) {
          this._stats[stat].value.forEach((x: any, i: any) => { x += node.sd[stat][i] })
        } else {
          this._stats[stat].value += node.sd[stat]
        }
      } else {
        const group = stat.match(/^[^_]+/);
        const belonging = group !== null ? group[0] : 'unlisted';

        this._stats[stat] = {
          value: node.sd[stat],
          id: stat,
          group: belonging,
        }
      }
    });

    Emitter.emit('forceRender');
  }

  private deallocated(node: any) {
    Object.keys(node.sd).forEach((stat) => {
      if (Array.isArray(this._stats[stat].value)) {
        this._stats[stat].value.forEach((x: any, i: any) => { x -= node.sd[stat][i] })
      } else {
        this._stats[stat].value -= node.sd[stat]
      }

      if (this._stats[stat].value <= 0 || (typeof this._stats[stat].value[0] !== 'undefined' && this._stats[stat].value[0] !== 0)) {
        delete this._stats[stat]
      }
    })

    Emitter.emit('forceRender');
  }
}

export default new Allocation()
