import { observable } from 'mobx'

class GUIStore implements GUI {
  @observable characterInfoOpen = false
  // @observable overlayQueue: Array<OverlayQueue> = [];
  @observable overlayOpen = false
}

export default new GUIStore()
