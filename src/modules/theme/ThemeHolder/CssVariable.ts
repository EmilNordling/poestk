import shortid from 'shortid';

enum EnumCSSVariableTypes {
	color = 'COLOR',
	font = 'FONT',
	icon = 'ICON',
}

class CssVariable {
	public readonly hash = shortid.generate();

	constructor(
		public styling: string,
	) { }
}

export default CssVariable;
