import { RuleType } from './rules';

class Spec {
	constructor(
		public root: Node | null = null,
		public startIndex = 0,
		public endIndex = 0,
		public findType: RuleType | null = null,
	) { }
}

export default Spec;
