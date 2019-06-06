const isFocused = (event: Event): boolean => {
	let originIsFocused = false;

	if (event.target && event.target instanceof Element && event.target !== document.body) {
		originIsFocused = document.activeElement === event.target;
	}

	return originIsFocused;
}

export default isFocused;
