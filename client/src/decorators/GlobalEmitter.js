import EventEmitter from 'events'

class GlobalEmitter extends EventEmitter {
  listen(element, e, emit) {
    let events = e

    if (!Array.isArray(events)) events = [events]

    events.map(listen => element.addEventListener(
      listen,
      event => this.emit(emit, event),
    ))
  }
}

export default new GlobalEmitter()

