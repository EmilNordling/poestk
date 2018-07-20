/**
 * Basically just https://github.com/developit/mitt but with custom functions
 */

type EventHandler = (event?: any) => void;
type EventHandlerList = Array<EventHandler>;
type EventHandlerMap = {
  [type: string]: EventHandlerList,
};

export default function emitter(all: EventHandlerMap) {
  all = all || Object.create(null);

  return {
    on(type: string, handler: EventHandler) {
      (all[type] || (all[type] = [])).push(handler);
    },
    off(type: string, handler: EventHandler) {
      if (all[type]) {
        all[type].splice(all[type].indexOf(handler) >>> 0, 1);
      }
    },
    emit(type: string, event: any) {
      (all[type] || []).slice().map(handler => handler(event));
    },
  };
}
