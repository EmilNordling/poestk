import { useState, useEffect } from 'react';

function useKeyPress(targetKey: string) {
	// State for keeping track of whether key is pressed
	const [keyPressed, setKeyPressed] = useState(false);

	// If pressed key is our target key then set to true
	function downHandler({ key }: KeyboardEvent) {
		if (key === targetKey) {
			setKeyPressed(true);
		}
	}

	// If released key is our target key then set to false
	const upHandler = ({ key }: KeyboardEvent) => {
		if (key === targetKey) {
			setKeyPressed(false);
		}
	};

	// Add event listeners
	useEffect(() => {
		addEventListener('keydown', downHandler);
		addEventListener('keyup', upHandler);
		// Remove event listeners on cleanup
		return () => {
			removeEventListener('keydown', downHandler);
			removeEventListener('keyup', upHandler);
		};
	}, []); // Empty array ensures that effect is only run on mount and unmount

	return keyPressed;
};

export default useKeyPress;
