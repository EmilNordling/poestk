import Character from './Character';
import initializeStats from '../stat/initializeStats';
import addStat from '../stat/addStat';
import parse from '../parser/parse';

function base(origin: Character) {
	initializeStats(origin);

	parse('10% increased strength');

	addStat(origin, {
		key: 'strength',
		type: 'LIMIT',
		tags: ['attributes'],
		displayAs: '#',
	});

	addStat(origin, {
		key: 'life',
		type: 'LIMIT',
		tags: ['defence'],
		displayAs: '# %',
		dependantOn: ['strength'],
		pipes: [
			(state) => {
				if (!state.stats['strength']) throw new Error('Could not find strength');

				return {
					origin: 'strength',
					key: 'ADDED_FLAT',
					value: state.stats['strength'].display,
				};
			},
		],
	});
}

export default base;
