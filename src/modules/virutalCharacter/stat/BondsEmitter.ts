import AbstractStat from './AbstractStat';

type Handlers = {
	[key: string]: AbstractStat[];
};

class BondsEmitter {
	public graph: any;
	public statsInTick: { [key: string]: AbstractStat } = {};
	private handlers: Handlers = {};
	private iteration: number = 0;

	public reset() {
		this.graph = {};
		this.iteration = 0;
	}

	public on(key: string, stat: AbstractStat) {
		if (this.handlers[key] === undefined) {
			this.handlers[key] = [];
		}

		this.handlers[key].push(stat);
	}

	public emit(key: string) {
		if (this.handlers[key] === undefined) return;

		++this.iteration;

		this.handlers[key].forEach((handler) => {
			if (this.graph[this.iteration] === undefined) {
				this.graph[this.iteration] = {};

				this.graph[this.iteration][key] = handler.constructor.name;
			} else {
				throw new Error(`
Circular updates detected:

${Object.keys(this.graph).map(item => ` ${item}`).join(' >')} > ${key}
        `);
			}

			handler.update();
		});
	}
}

export default BondsEmitter;
