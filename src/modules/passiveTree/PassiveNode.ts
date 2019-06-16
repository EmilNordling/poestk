import { Passive } from './Passive.lib';
import { PassiveNodeMap } from './internals';

type TempData = {
	classStartingNode: Passive.Id[];
	children: Passive.Id[];
	parents: Passive.Id[];
};

class PassiveNode {
	public readonly id: number;
	// rendering
	public readonly x: number;
	public readonly y: number;
	public readonly arc: number;
	public readonly skillSprite: Passive.SkillSprite;

	// node status
	public readonly isKeyStone: boolean | undefined;
	public readonly isNoteable: boolean | undefined;
	public readonly isMastery: boolean | undefined;
	public readonly isJewelSocket: boolean | undefined;
	public readonly isMultipleChoice: boolean | undefined;
	public readonly isMultipleChoiceOption: boolean | undefined;
	public readonly isAscendancyStart: boolean | undefined;
	public readonly isAscendancy: boolean | undefined;

	// texts
	public readonly name: string | undefined;
	public readonly ascendancyName: string | undefined;
	public readonly reminderText: string | undefined;
	public readonly flavourText: string[] | undefined;
	public readonly statDescriptions: Passive.TextValue[] | undefined;

	// TODO: remove these
	public readonly groupId: number | undefined;
	public readonly passivePointsGranted: number | undefined;
	public readonly strengthGain: number | undefined;
	public readonly intelligenceGain: number | undefined;
	public readonly dexterityGain: number | undefined;

	// references
	public classStartingNode: PassiveNode[] = [];
	public children: PassiveNode[] = [];
	public parents: PassiveNode[] = [];

	// misc
	private tempData: TempData;

	constructor(
		data: Passive.Node,
	) {
		this.id = data.a;
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
