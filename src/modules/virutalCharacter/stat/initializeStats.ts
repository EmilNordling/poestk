import Character from '../character/Character';
import { statsStore } from './internal';

function initializeStats(origin: Character) {
	if (statsStore.has(origin)) throw new Error('Character already exists');

	statsStore.set(origin, {
		selectedAscendancy: undefined,
		stats: {},
		contextualizedStats: {},
	});
}

export default initializeStats;
