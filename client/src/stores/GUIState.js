import { observable } from 'mobx'

class GUIState {
  @observable characterInfoOpen = false
}

export default new GUIState()
