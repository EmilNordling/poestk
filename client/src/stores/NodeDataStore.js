import { computed, observable, action } from 'mobx'
import { loader } from '../../../pst/src/core'

class NodeDataStore {
  @observable loaded = false;

  @observable nodes = {}

  @computed get nodeData() {
    return this.nodes
  }

  @action
  async getPassiveData() {
    if (this.loaded) return

    await loader.start()

    this.loaded = true

    this.nodes = loader.finish().nodes
  }
}

export default new NodeDataStore()
