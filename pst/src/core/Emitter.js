import EventEmitter from 'events';

class Emitter extends EventEmitter {
  constructor() {
    super();

    this.nativeEvents = [];
  }

  rebindNativeEvents() {
    this.nativeEvents.forEach(listner =>
      listner.htmlElement.addEventListener(
        listner.emitterCall,
        listner.eventFunction,
      ),
    );
  }

  unbindNativeEvents() {
    this.nativeEvents.forEach(listner =>
      listner.htmlElement.removeEventListener(
        listner.emitterCall,
        listner.eventFunction,
      ),
    );
  }

  listen(element, event, emit) {
    const builder = {
      htmlElement: element,
      nativeEvent: event,
      emitterCall: emit,
      eventFunction: nativeEvent => this.emit(emit, nativeEvent),
    };

    element.addEventListener(builder.nativeEvent, builder.eventFunction);

    this.nativeEvents.push(builder);
  }
}

export default new Emitter();
