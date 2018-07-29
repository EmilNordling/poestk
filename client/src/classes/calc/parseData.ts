import getNewCharacter from './virutalCharacter';
import { scheme } from '../../../../mod';
import rules, { RuleType } from './rules';

interface TreeDataNodeData {
  condition: string[];
  context: string;
  modifier: {
    [key: string]: any;
  };
}

interface TreeDataNode {
  index: number;
  data: Array<TreeDataNodeData | null>;
}

class Node {
  children: Array<Node> | null = null;
  type: string;
  group: RuleType;

  constructor(type: string, group: RuleType) {
    this.type = type;
    this.group = group;
  }
}

class Spec {
  public root: Node | null = null;
  public startIndex: number = 0;
  public endIndex: number = 0;
  public knowedType: RuleType | null = null;

  constructor(root: Node | null, startIndex: number, endIndex: number, find: RuleType | null = null) {
    this.root = root;
    this.startIndex = startIndex;
    this.endIndex = endIndex;
    this.knowedType = find;
  }
}

function parse(source: string, SDModifierID: string, value: number) {
  const topLevelNodes: Array<Node> = [];
  const remainingParses: Array<Spec> = [];
  let offset = 0;

  if (source.length !== 0) {
    remainingParses.push(new Spec(null, offset, source.length));
  }

  while (remainingParses.length !== 0) {
    const spec = remainingParses.pop() as Spec;

    if (offset >= source.length) {
      break;
    }

    const readSpan = source.substring(spec.startIndex, spec.endIndex);
    let foundRule = false;

    for (let _rule in rules) {
      const rule = rules[_rule];
      const matcher = rule.pattern.exec(readSpan);

      if (matcher !== null) {
        foundRule = true;
        offset += matcher[0].length;

        topLevelNodes.push(new Node(rule.name, rule.group));

        remainingParses.push(rule.parse(offset, source.length));

        break;
      }
    }

    if (!foundRule) {
      throw new Error(`Could not find rule to match: "${readSpan}"`);
    }
  }

  // bad implementation just to get prototype shit to work
  const fakeAST: TreeDataNodeData = {
    context: '',
    condition: [],
    modifier: {},
  } as { context: string, condition: Array<string>, modifier: { [key: string]: any }};
  let action;
  let modiferType;
  topLevelNodes.forEach((node) => {
    switch (node.group) {
      case RuleType.action:
        action = node;
        break;
      case RuleType.context:
        fakeAST.context = node.type;
        break;
      case RuleType.modifier:
        modiferType = node.type;
        fakeAST.modifier[modiferType] = {};
        break;
    }
  });
  fakeAST.modifier[modiferType][action.type] = value;

  return fakeAST;
}

function parseTreeData(SDmodifier: string, value: number) {
  // generates an abstract syntax tree
  try {
    const syntaxTree = parse(scheme[SDmodifier].toLowerCase(), SDmodifier, value);

    return syntaxTree;
  } catch (error) {
    console.error(error);

    return null;
  }
}

function parseItemData() {

}

export {
  Spec,
  parseTreeData,
  parseItemData,
  TreeDataNode,
};
