import Controller from '../controller';
import View from './View';
import FrameProvider from './FrameProvider';
import Emitter from '../Emitter';
import { changeClass } from '../publicAPI';

class Renderer {
  constructor() {
    Emitter.on('__PARSE__FINISHED__', () => this.init());
  }

  init() {
    changeClass('scion');

    this.FrameProvider = new FrameProvider();
    this.View = new View();

    window.addEventListener('resize', () => {
      this.View.Canvas.updateSize(Controller.ClientStore.parent.offsetWidth, Controller.ClientStore.parent.offsetHeight);
      Emitter.emit('draw');
    });

    Emitter.on('draw', () => this.FrameProvider.requestTick());

    this.FrameProvider.mountTabs(
      this.View,
    );

    this.FrameProvider.setPrimaryTab(this.FrameProvider.tabs[0]);
  }

  mountCanvas(parent) {
    Controller.ClientStore.parent = parent;
    this.View.Canvas.updateSize(Controller.ClientStore.parent.offsetWidth, Controller.ClientStore.parent.offsetHeight);
    Controller.ClientStore.parent.append(this.View.Canvas.getCanvas());
    this.FrameProvider.requestTick();
  }
}

export default new Renderer();
