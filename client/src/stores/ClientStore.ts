import { observable } from 'mobx'

class ClientStore {
  @observable client = {}
}

export default new ClientStore()
