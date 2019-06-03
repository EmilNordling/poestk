export enum RuleType {
	special = 'special',
	action = 'action',
	modifier = 'modifier',
	context = 'context',
	condition = 'condition',
	abstract = 'abstract',
}

export interface Rule {
	readonly name: string;
	readonly pattern: RegExp;
	readonly group: RuleType;
	readonly type: string;
	readonly tags: string[];
	readonly displayAs: string;
	readonly dependantOn: string[];
	readonly pipes: {
		get: string;
		use: string;
	}[];
}

type Rules = {
	[rule: string]: Rule,
};

// class AttackAnd implements Rule {
//   readonly name = 'attackSpeed';
//   readonly pattern = /^attack and[\s]?/;
//   readonly type = RuleType.modifier;

//   public parse(startIndex: number, endIndex: number) {
//     return new Spec(null, startIndex, endIndex);
//   }
// }

const increased: Rule = {
	name: '',
	pattern: /^[#0-9]*% increased[\s]?/,
	group: RuleType.action,
	type: 'LIMIT',
	tags: [],
	displayAs: '# %',
	dependantOn: [],
	pipes: [],
};

const strength: Rule = {
	name: 'strength',
	pattern: /^strength[\s]?/,
	group: RuleType.modifier,
	type: 'LIMIT',
	tags: ['defence'],
	displayAs: '# %',
	dependantOn: ['strength'],
	pipes: [
		{
			get: 'strength',
			use: 'ADDED_FLAT',
		},
	],
};

// const elementalDamage = {
//   name: 'elementalDamage',
//   pattern: /^elemental damage[\s]?/,
//   group: RuleType.modifier,
// };

export default {
	increased,
	strength,
} as Rules;
