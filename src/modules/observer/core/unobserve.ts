import { Observable } from './observable';
import { activeObservers } from './internals';

function unobserve<T>(observer: Observable<T>, key: symbol) {
	const observerReactions = activeObservers.get(observer);

	if (!observerReactions) return;

	observerReactions.delete(key);
}

export default unobserve;
