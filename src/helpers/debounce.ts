const debounce = (fn: Function, interval: number) => {
	let timeout: number;

	return function debouncer(...args: any[]) {
		const functionCall = () => fn.apply(this, args);

		clearTimeout(timeout);
		timeout = setTimeout(functionCall, interval);
	};
};

export default debounce;
