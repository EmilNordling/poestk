import Matrix from './Matrix';
import Ptr from './Ptr';

let instance: InstanceResolver | undefined;

class InstanceResolver {
	public readonly matrix: Matrix;
	public readonly ptr: Ptr;

	constructor() {
		this.matrix = new Matrix();
		this.ptr = new Ptr(this.matrix);
	}

	static set(): InstanceResolver {
		InstanceResolver.destroy();

		return (instance = new InstanceResolver());
	}

	static get(): InstanceResolver | undefined {
		if (!instance) return;

		return instance;
	}

	static destroy() {
		if (instance) {
			console.log('clean');
		}

		instance = undefined;
	}
}

export default InstanceResolver;
