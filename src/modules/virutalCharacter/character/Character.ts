import { GameStat } from '../stat/types';
import base from './base';
import updateStat from '../stat/updateStat';
import BondsEmitter from '../stat/BondsEmitter';
import ResolvesPipes from '../stat/ResolvesPipes';
import { statsStore } from '../stat/internal';
import statsStack from '../stat/statsStack';

interface Specification {
	onUpdate: (list: any) => void;
	onPreview?: (oldStats: any, newStats: any) => void;
}

/**
 *
 */
class Character {
	public history: Symbol[] = [];
	public bonds = new BondsEmitter();
	public tick = 0;

	constructor(spec: Specification) {
		base(this);
	}

	public preview() {
	}

	/**
   * Update
   */
	public update(queue: GameStat.Change[]) {
		this.bonds.reset();
		ResolvesPipes.clear();

		while (queue.length > 0) {
			const item = queue.shift()!;

			updateStat(this, item);
		}

		ResolvesPipes.resolveAll();

		// asd

		Object.values(this.bonds.statsInTick).forEach((stat) => {
			stat.updateStats(this.tick);
		});

		this.bonds.reset();
		console.log(statsStore.get(this)!.stats);
	}

	public getStats() {
		const internalState = statsStore.get(this);

		if (!internalState) return {};

		const sortedIntoGroups = Object.values(internalState.stats).reduce((groups, raw) => {
			const tag = raw.tags[0];

			if (!groups[tag]) groups[tag] = [];

			groups[tag].push({
				raw,
				transpiled: raw.displayAs.replace('#', statsStack(raw.internal)),
			});

			return groups;
		}, {});

		return sortedIntoGroups;
	}
}

export default Character;
