import EventEmitter from 'events';

class Emitter extends EventEmitter {
  listen(element, e, emit) {
    let events = e;

    if (!Array.isArray(events)) events = [events];

    events.map(listen => element.addEventListener(listen, event => this.emit(emit, event)));
  }
}

export default new Emitter();
