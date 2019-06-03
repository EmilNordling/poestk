declare function preval(fn: TemplateStringsArray): any;

declare var require: <T = any>(module: string) => T;

declare module '*.json' {
	const value: any;

	export default value;
}

declare const process: {
	env: {
		NODE_ENV: 'development' | 'production';
	},
};
