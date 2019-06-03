import AbstractStat from './AbstractStat';
import Character from '../character/Character';

type StatHolder = { [key: string]: AbstractStat }

const statStore = new WeakMap<Character, StatHolder>();

export default statStore;
