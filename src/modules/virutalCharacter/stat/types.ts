import AbstractStat from './AbstractStat';

export namespace GameStat {
	export type Pipe = (state: InternalState) => {
		origin: string;
		key: StatModifier;
		value: number;
	};

	export interface Specification {
		key: string;
		type: Type;
		tags: string[];
		displayAs: string;
		context?: string;
		dependantOn?: string[];
		pipes?: Pipe[];
	}

	interface InternalState {
		selectedAscendancy: number | undefined;
		stats: {
			[key: string]: AbstractStat,
		};
		contextualizedStats: {
			[key: string]: {
				[key: string]: AbstractStat,
			},
		};
	}

	export type StatModifier =
		'ADDED_FLAT' |
		'INCREASED' |
		'REDUCED' |
		'MORE' |
		'LESS' |
		'MIN' |
		'MAX';

	export type Type =
		'LIMIT' |
		'RANGE';

	export interface Change {
		key: string;
		type: StatModifier;
		value: number | number[];
		origin: any;
	}

	export type TrackedStat = {
		origin?: any;
		value: number;
	};

	export type TrackedStats = {
		origin: TrackedStat;
		[key: string]: TrackedStat;
	};

	export interface InheritableStat {
		type: Type;
		INCREASED: TrackedStats;
		REDUCED: TrackedStats;
		MORE: TrackedStats;
		LESS: TrackedStats;
	}

	export interface LimitInternalStat extends InheritableStat {
		ADDED_FLAT: TrackedStats;
	}

	export interface RangeInternalStat extends InheritableStat {
		MIN: TrackedStats;
		MAX: TrackedStats;
	}

	export interface InternalStat {
		type: Type;
		internal: LimitInternalStat | RangeInternalStat;
		expose(): LimitInternalStat;
		expose(): RangeInternalStat;
	}

	export enum ActionPattern {
		INCREASED,
		DECREASED,
	}

	export interface StatActions {
		type: ActionPattern;
		carriedValue: number;
	}
}
