import { activeObservers } from './internals';

function set<T extends object>(target: T, key: PropertyKey, value: any, receiver: any): boolean {
	const result = Reflect.set(target, key, value);

	const reactions = activeObservers.get(receiver);

	if (!reactions) {
		return result;
	}

	reactions.forEach(fn => fn({
		value,
		key,
		target,
	}));

	return result;
}

export default {
	set,
};
