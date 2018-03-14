import { observable, action } from 'mobx'

class AllocationStore {
  @observable allocated = {}

  @action allocatedData() {
    return this.allocated
  }
}

export default new AllocationStore()
