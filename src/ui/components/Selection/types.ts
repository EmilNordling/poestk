export namespace SelectionComponent {
	type Group = Item[];

	type Specification = Group[];

	export interface Item {
		action: (event: React.MouseEvent | KeyboardEvent) => void;
		description: string;
		shortcut?: string;
		group?: Group;
	}

	export interface Props {
		actions: Specification;
	}

	export interface Style { }
}
