import { computed, observable, action } from 'mobx'
import NodeData from '../../../pst/src/corev2/NodeData'

class NodeDataStore {
  @observable nodes = {}

  @computed get nodeData() {
    return this.nodes
  }

  @action
  async getPassiveData() {
    await NodeData.load()

    this.nodes = NodeData.nodes
  }
}

export default new NodeDataStore()
