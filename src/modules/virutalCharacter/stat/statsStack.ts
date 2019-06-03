import { GameStat } from './types';

function reduceStat(stat: GameStat.TrackedStats) {
	return Object.values(stat)
		.map(statTracked => statTracked.value)
		.reduce((accumulator, currentValue) => accumulator + currentValue);
}

function statsStack(stat: (GameStat.LimitInternalStat | GameStat.RangeInternalStat)): number {
	const increased = reduceStat(stat.INCREASED);
	const reduced = reduceStat(stat.REDUCED);
	const more = reduceStat(stat.MORE);
	const less = reduceStat(stat.LESS);

	if (stat.type === 'RANGE') {
	}

	const addedFlat = reduceStat((stat as GameStat.LimitInternalStat).ADDED_FLAT);

	return addedFlat * (1 + ((increased - reduced) / 100)) * (1 + (more / 100)) * (1 + (less / 100));
}

export default statsStack;
