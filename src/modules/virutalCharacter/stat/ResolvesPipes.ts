import { GameStat } from './types';
import AbstractStat from './AbstractStat';
import { statsStore } from './internal';
import Character from '../character/Character';

type PipeResolver = {
	pipes: GameStat.Pipe[],
	origin: Character,
	stat: AbstractStat,
};

class ResolvesPipes {
	public pipes: PipeResolver[] = [];
	public syncedToTick = 0;

	public clear() {
		this.pipes = [];
	}

	public addPipes(pipes: GameStat.Pipe[], origin: Character, stat: AbstractStat) {
		this.pipes.push({
			pipes,
			origin,
			stat,
		});
	}

	public resolveAll() {
		if (this.pipes.length > 0) {
			this.pipes.forEach((pipe) => {
				const state = statsStore.get(pipe.origin)!;

				const pipeResult = pipe.pipes.map(pipe => pipe(state));

				pipeResult.forEach((stat) => {
					pipe.stat.accessInternal()[stat.key][stat.origin] = {
						value: stat.value,
						origin: state.stats[stat.origin],
					};
				});
			});

			this.pipes.forEach(({ stat, origin }) => {
				if (stat.dependantOn !== undefined) {
					stat.dependantOn.forEach(item => origin.bonds.emit(item));
				}
			});

			this.clear();
		}
	}
}

export default new ResolvesPipes();
