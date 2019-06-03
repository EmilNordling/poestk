interface Dictionary {
	abort: string;
	apps: string;
	appsRounded: string;
	arrow: string;
	arrow2: string;
	arrow3: string;
	arrowStroke: string;
	ascendancy: string;
	book: string;
	burgerCompact: string;
	burgerSpacing: string;
	burgerThick: string;
	chain: string;
	check: string;
	checkmark: string;
	checkmark2: string;
	cloud: string;
	code: string;
	codeCircle: string;
	collaps: string;
	collaps2: string;
	collapsArrow: string;
	connection: string;
	danger: string;
	dangerSmall: string;
	dot: string;
	editBig: string;
	editSmall: string;
	exit: string;
	exitThick: string;
	eye: string;
	eyeNo: string;
	gear: string;
	gearFilled: string;
	gearFilled2: string;
	gearHollow: string;
	heartbeat: string;
	iconTool: string;
	info: string;
	infoSmall: string;
	internetConnection: string;
	list: string;
	listBig: string;
	listBigRounded: string;
	listRounded: string;
	logo: string;
	menu: string;
	moon: string;
	moonFilled: string;
	moveLeft: string;
	moveRight: string;
	options: string;
	plus: string;
	plusSharp: string;
	plusSoft: string;
	rocket: string;
	rocketFilled: string;
	rocketWindow: string;
	search: string;
	search2: string;
	spit: string;
	spitHorizontal: string;
	split: string;
	star: string;
	trash: string;
	unchain: string;
	varning: string;
	warning: string;
	warningSmall: string;
	window: string;
}

type IconMap = {
	[key in keyof Dictionary]: {
		innerHTML: string;
		viewBox: string;
	}
};

export type Icons = keyof Dictionary;

const iconMap: IconMap = preval`
	const fs = require('fs');
	const { join, resolve } = require('path');
	const { DOMParser, XMLSerializer } = require('xmldom');

	const iconPath = resolve('public/icons');
	const icons = fs.readdirSync(iconPath);

	const matching = ['g', 'rect', 'polygon', 'path', 'linearGradient', 'stop', 'line', 'defs', 'style', 'circle'];

	function getString(xml) {
		let ViewBox = '';
		let innerHTML = '';
		const content = xml.childNodes.item(0);

		const item = xml.childNodes.item(0);
		const { nodeName } = item;

		if (nodeName === undefined) throw new Error('Svg is incorrectly made');

		if (item.nodeType === 1 && item.attributes.length > 0) {
			for (let j = 0; j < item.attributes.length; j++) {
				const attribute = item.attributes.item(j);

				if (attribute.nodeName === 'viewBox') {

					ViewBox = attribute.nodeValue;
				}
			}
		}

		for (let i = 0; i < content.childNodes.length; i++) {
			const node = content.childNodes.item(i);

			if (matching.includes(node.nodeName)) {
				try {
					innerHTML += (new XMLSerializer().serializeToString(node)).trim().replace('xmlns="http://www.w3.org/2000/svg"', '');
				} catch (error) {
					console.error(error);
				}
			}
		}

		return {
			innerHTML,
			viewBox: ViewBox,
		};
	}

	module.exports = icons.reduce((acc, file) => {
		const fileData = fs.readFileSync(join(iconPath, file), 'utf8');

		const parser = new DOMParser();

		try {
			acc[file.slice(0, -4)] = getString(parser.parseFromString(fileData, 'image/svg+xml'));
		} catch (error) {
			console.log('Error in: ' + file.slice(0, -4));
			console.log('--> ' + error.message);
		}

		return acc;
	}, {});
`;

export default iconMap;
