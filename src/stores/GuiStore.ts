import { observable, action, reaction, computed, intercept, toJS } from 'mobx';

type Selection = {
	top: number,
	left: number,
	data: any,
	origin: 'top' | 'right' | 'bottom' | 'left',
	blocksUserInput: boolean,
};

class Store {
	@observable public modals: JSX.Element[] = [];
	@observable public selections: Selection[] = [];

	@action public shiftModal() {
		this.modals.shift();
	}
}

const GuiStore = new Store();

export default GuiStore;
