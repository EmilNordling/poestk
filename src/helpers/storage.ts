type StoreType = 'session' | 'local';

interface StorageSpecification {
	prefix?: string;
	type?: StoreType;
}

function storage({ prefix, type }: StorageSpecification = {}) {
	const storeType: StoreType = type || 'local';
	const store: Storage = storeType === 'local' ? localStorage : sessionStorage;

	return {
		storeType,

		get<T = string>(key: string): T | null {
			const item = store.getItem(`${prefix || ''}${key}`);

			if (!item) return null;

			return JSON.parse(item);
		},

		set(key: string, data: any) {
			store.setItem(`${prefix || ''}${key}`, JSON.stringify(data));
		},

		removeItem(key: string) {
			store.removeItem(`${prefix || ''}${key}`);
		},
	};
}

export default storage;
