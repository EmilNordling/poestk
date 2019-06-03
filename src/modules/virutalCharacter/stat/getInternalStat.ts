import { GameStat } from './types';

function getInternalStat(type: GameStat.Type): GameStat.LimitInternalStat | GameStat.RangeInternalStat {
	if (type === 'RANGE') {
		return {
			type,
			INCREASED: {
				origin: {
					value: 0,
				},
			},
			REDUCED: {
				origin: {
					value: 0,
				},
			},
			MORE: {
				origin: {
					value: 0,
				},
			},
			LESS: {
				origin: {
					value: 0,
				},
			},
			MIN: {
				origin: {
					value: 0,
				},
			},
			MAX: {
				origin: {
					value: 0,
				},
			},
		};
	}

	return {
		type,
		INCREASED: {
			origin: {
				value: 0,
			},
		},
		REDUCED: {
			origin: {
				value: 0,
			},
		},
		MORE: {
			origin: {
				value: 0,
			},
		},
		LESS: {
			origin: {
				value: 0,
			},
		},
		ADDED_FLAT: {
			origin: {
				value: 0,
			},
		},
	};
}

export default getInternalStat;
