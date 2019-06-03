import rules, { RuleType, Rule } from './rules';
import Spec from './Spec';

class Node {
	public readonly children: Node[];
	public readonly name: string;
	public readonly group: RuleType;

	constructor(rule: Rule) {
		this.name = rule.name;
		this.group = rule.group;
	}
}

function parse(source: string) {
	const topLevelNodes: Node[] = [];
	const remainingParses: Spec[] = [];

	let offset = 0;

	if (source.length !== 0) {
		remainingParses.push(new Spec(null, offset, source.length));
	}

	while (remainingParses.length !== 0) {
		const spec = remainingParses.pop()!;

		if (offset >= source.length) {
			break;
		}

		const readSpan = source.substring(spec.startIndex, spec.endIndex);

		let foundRule = false;

		for (const r in rules) {
			const rule = rules[r];
			const matcher = rule.pattern.exec(readSpan);

			if (matcher) {
				foundRule = true;
				offset += matcher[0].length;

				topLevelNodes.push(new Node(rule));

				remainingParses.push(new Spec(null, offset, source.length));

				break;
			}
		}

		if (!foundRule) {
			console.log(source);
		}

		console.log(topLevelNodes);
	}
}

export default parse;
