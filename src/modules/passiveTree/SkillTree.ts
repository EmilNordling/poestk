import InstanceResolver from './core/InstanceResolver';

class SkillTree {
	public readonly internal: InstanceResolver;

	constructor() {
		this.internal = InstanceResolver.set();
	}
}

async function init(canvas: HTMLCanvasElement) {
	const skillTree = new SkillTree();

	await skillTree.internal.matrix.popularize();

	skillTree.internal.ptr.createInstance(canvas);
}

export default init;
