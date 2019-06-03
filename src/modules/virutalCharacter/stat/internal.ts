import Character from '../character/Character';
import { GameStat } from './types';

const statsStore = new WeakMap<Character, GameStat.InternalState>();

export {
	statsStore,
};
