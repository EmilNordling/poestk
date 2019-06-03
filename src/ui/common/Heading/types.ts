export namespace HeadingComponent {
	export interface Props extends Style { }

	export interface Style {
		size: 1 | 2 | 3 | 4;
		margin?: boolean | number;
		weight?: 300 | 400 | 500 | 700 | 800;
		color?: string;
		align?: 'center' | 'left' | 'right';
	}
}
