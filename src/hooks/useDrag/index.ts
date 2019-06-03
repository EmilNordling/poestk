import { useEffect, useRef } from 'react';

type Handler = {
	dragHandler?: (event: MouseEvent, ref: React.RefObject<HTMLDivElement>) => void,
	startHandler?: (event: MouseEvent, ref: React.RefObject<HTMLDivElement>) => void,
	endHandler?: (event: MouseEvent, ref: React.RefObject<HTMLDivElement>) => void,
};

function useDrag({ dragHandler, startHandler, endHandler }: Handler): React.RefObject<HTMLDivElement> {
	const ref = useRef(null) as React.RefObject<HTMLDivElement>;
	let state = false;

	const setState = (newState: boolean) => {
		state = newState;
	};

	const handleDrag = (event: MouseEvent) => {
		if (state && dragHandler) dragHandler(event, ref);
	};
	const handleMouseDown = (event: MouseEvent) => {
		if (!state) {
			setState(true);

			if (startHandler) startHandler(event, ref);
		}
	};
	const handleMouseUp = (event: MouseEvent) => {
		if (state) {
			setState(false);

			if (endHandler) endHandler(event, ref);
		}
	};

	useEffect(
		() => {
			const element = ref;

			if (!element.current) {
				throw new Error('Needs an React.ref');
			}

			addEventListener('mousemove', handleDrag);
			addEventListener('mouseup', handleMouseUp);
			element.current.addEventListener('mousedown', handleMouseDown);

			const disposer = () => {
				const element = ref;

				if (element.current) {
					removeEventListener('mousemove', handleDrag);
					removeEventListener('mouseup', handleMouseUp);
					element.current.removeEventListener('mousedown', handleMouseDown);
				} else {
					console.warn('hook got disposed without removing EventListeners');
				}
			};

			return disposer;
		},
		[ref.current],
	);

	return ref;
}

export default useDrag;
