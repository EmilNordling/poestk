import { Character } from '../modules/virutalCharacter';
import { observable } from 'mobx';
import shortid from 'shortid';

interface Build {
	name: string;
	character: Character;
	tabIndex: number;
}

class Store {
	@observable public selectedIndex: number | undefined;
	@observable public builds: Build[] = [];

	public newCharacter() {
		const character = new Character({
			onUpdate: this.onUpdate,
			onPreview: this.onPreview,
		});

		const builder = {
			character,
			name: 'untitled',
			tabIndex: this.builds.length + 1,
			tabId: shortid.generate(),
		};

		this.builds.push(builder);

		this.selectedIndex = builder.tabIndex;
	}

	public selectIndex(newIndex: number) {
		this.selectedIndex = newIndex;
	}

	private onUpdate() {

	}

	private onPreview() {

	}
}

const BuildStore = new Store();

export default BuildStore;
