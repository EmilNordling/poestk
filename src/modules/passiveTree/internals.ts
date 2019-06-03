import PassiveNode from './PassiveNode';
import { Passive } from './Passive.lib';

const positionMap = ['x', 'y', 'z'];

const PassiveNodeMap = new Map<Passive.Id, PassiveNode>();

function addNode(node: PassiveNode) {
	PassiveNodeMap.set(node.id, node);
}

export {
	positionMap,
	addNode,
	PassiveNodeMap,
};
