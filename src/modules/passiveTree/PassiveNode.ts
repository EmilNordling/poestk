import { Passive } from './Passive.lib';
import { PassiveNodeMap } from './internals';

type TempData = {
	classStartingNode: Passive.Id[];
	children: Passive.Id[];
	parents: Passive.Id[];
};

class PassiveNode {
	// rendering
	public x: number;
	public y: number;
	public arc: number;
	public skillSprite: Passive.SkillSprite;

	// node status
	public isKeyStone: boolean | undefined;
	public isNoteable: boolean | undefined;
	public isMastery: boolean | undefined;
	public isJewelSocket: boolean | undefined;
	public isMultipleChoice: boolean | undefined;
	public isMultipleChoiceOption: boolean | undefined;
	public isAscendancyStart: boolean | undefined;
	public isAscendancy: boolean | undefined;

	// texts
	public name: string | undefined;
	public ascendancyName: string | undefined;
	public reminderText: string | undefined;
	public flavourText: string[] | undefined;
	public statDescriptions: Passive.TextValue[] | undefined;

	// TODO: remove these
	public groupId: number | undefined;
	public passivePointsGranted: number | undefined;
	public strengthGain: number | undefined;
	public intelligenceGain: number | undefined;
	public dexterityGain: number | undefined;

	// references
	public classStartingNode: PassiveNode[];
	public children: PassiveNode[];
	public parents: PassiveNode[];

	// DOM
	public domReference: SVGElement;

	// misc
	private tempData: TempData;

	constructor(
		public readonly id: number,
		data: Passive.Node,
	) {
		// rendering
		const [x, y, arc] = data.A;
		this.x = x;
		this.y = y;
		this.arc = arc;
		this.skillSprite = data.z;

		// node status
		this.isKeyStone = data.c;
		this.isNoteable = data.d;
		this.isMastery = data.f;
		this.isJewelSocket = data.g;
		this.isMultipleChoice = data.h;
		this.isMultipleChoiceOption = data.i;
		this.isAscendancyStart = data.v;
		this.isAscendancy = data.w;

		// texts
		this.name = data.e;
		this.passivePointsGranted = data.j;
		this.statDescriptions = data.l;
		this.reminderText = data.t;
		this.ascendancyName = data.u;
		this.flavourText = data.x;

		// TODO: remove these
		this.groupId = data.m;
		this.strengthGain = data.p;
		this.dexterityGain = data.q;
		this.intelligenceGain = data.r;

		this.tempData = {
			children: data.s || [],
			parents: data.y || [],
			classStartingNode: data.k || [],
		};
	}

	public setReferences() {
		if (!this.tempData) return;

		this.children = this.tempData.children.map(node => PassiveNodeMap.get(node)!);
		this.parents = this.tempData.parents.map(node => PassiveNodeMap.get(node)!);
		this.classStartingNode = this.tempData.classStartingNode.map(node => PassiveNodeMap.get(node)!);

		delete this.tempData;
	}
}

export default PassiveNode;
