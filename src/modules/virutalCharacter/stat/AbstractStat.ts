import { GameStat } from './types';
import getInternalStat from './getInternalStat';
import Character from '../character/Character';
import statsStack from './statsStack';
import ResolvesPipes from './ResolvesPipes';
import shortid from 'shortid';

class AbstractStat {
	public pipes: GameStat.Pipe[] | undefined;
	public syncedToTick: number;
	public dependantOn: string[] | undefined;
	public readonly hash = shortid.generate();
	public readonly displayAs: string;
	public readonly property: string;
	public readonly tags: string[];
	private displayValue: number;
	private readonly internal: (GameStat.LimitInternalStat | GameStat.RangeInternalStat);

	public get display(): number {
		if (this.syncedToTick !== this.origin.tick) {
			this.updateStats(this.origin.tick);
		}

		return this.displayValue;
	}

	constructor(
		private origin: Character,
		{
			key,
			type,
			tags,
			displayAs,
			dependantOn,
			pipes,
		}: GameStat.Specification,
	) {
		this.property = key;
		this.internal = getInternalStat(type);
		this.pipes = pipes;
		this.dependantOn = dependantOn;
		this.tags = tags;
		this.displayAs = displayAs;

		origin.bonds.on(key, this);
	}

	public accessInternal(): (GameStat.LimitInternalStat | GameStat.RangeInternalStat) {
		return this.internal;
	}

	public update = (change?: GameStat.Change) => {
		if (change !== undefined) {
			const { type, value } = change;

			if (this.internal[type] !== undefined) {
				this.internal[type].origin.value += value;
			}

			if (this.pipes) {
				ResolvesPipes.addPipes(this.pipes, this.origin, this);
			}
		}
	}

	public updateStats(tick: number): void {
		this.displayValue = statsStack(this.internal);

		this.syncedToTick = tick;
	}
}

export default AbstractStat;
