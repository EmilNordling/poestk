import { Observable } from './observable';

export type ReactionFn = () => void;

const origin = new WeakMap<Observable<Object>, Object>();
const activeObservers = new WeakMap<Observable<Object>, Map<keyof any, any>>();

function registerObserver<T>(obj: Observable<T>) {
	activeObservers.set(obj, new Map());
}

export {
	origin,
	activeObservers,
	registerObserver,
};
