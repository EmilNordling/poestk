import Character from '../character/Character';
import { GameStat } from './types';
import { statsStore } from './internal';
import AbstractStat from './AbstractStat';

function addStat(origin: Character, spec: GameStat.Specification) {
	const state = statsStore.get(origin);

	if (state === undefined) throw new Error('Can not find the character');

	if (state.stats[spec.key] !== undefined) throw new Error('Stat already exists');

	state.stats[spec.key] = new AbstractStat(origin, spec);
}

export default addStat;
