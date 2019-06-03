import { GameStat } from './types';
import { statsStore } from './internal';
import Character from '../character/Character';

function updateStat(origin: Character, change: GameStat.Change) {
	const state = statsStore.get(origin);

	if (state === undefined) throw new Error('Can not find the character');

	if (!state.stats[change.key]) {
		console.log(change);
	}

	if (!origin.bonds.statsInTick[change.key]) {
		origin.bonds.statsInTick[change.key] = state.stats[change.key];
	}

	// Update
	state.stats[change.key].update(change);
}

export default updateStat;
