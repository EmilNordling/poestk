import { observable, action, reaction, computed, intercept, toJS } from 'mobx';

class Store {
	@observable public modals: JSX.Element[] = [];

	@action public shiftModal() {
		this.modals.shift();
	}
}

const GuiStore = new Store();

export default GuiStore;
