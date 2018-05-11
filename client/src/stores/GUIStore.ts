import { observable } from 'mobx'

class GUIStore implements GUI {
  @observable isHovering = false;
  @observable characterInfoOpen = false;
  @observable bottomBar = 40;
  // @observable overlayQueue: Array<OverlayQueue> = [];
  @observable overlayPrecent = 0;
  @observable overlayOpen = false;
}

export default new GUIStore()
