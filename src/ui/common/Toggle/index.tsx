import React, { useRef, useState, Fragment } from 'react';
import { ToggleComponent } from './types';
import style from './style';
import useDrag from '../../../hooks/useDrag/index';

function Toggle<T>({ formGroup, formKey, onChange, ...props }: ToggleComponent.Props<T>) {
	const parentRef = useRef(null) as React.RefObject<HTMLDivElement>;

	let value = formGroup ? formGroup.pull(formKey as string) : false;
	let position = value ? 100 : 0;
	let blockClick = false;

	const updateValue = (update = true) => {
		if (update) {
			if (position < 50) {
				position = 0;
			} else {
				position = 100;
			}
		}

		const previousValue = value;

		value = position < 50 ? false : true;

		if (previousValue !== value) {
			if (onChange) onChange(value);

			if (formGroup) {
				formGroup.push(formKey as string, value);
			}
		}
	};

	const updatePosition = (element: HTMLDivElement) => (element.style.transform = `translateX(${position}%)`);

	const ref = useDrag({
		startHandler: () => {
			ref.current.classList.add('js-dragging');
		},
		dragHandler: (event, { current }) => {
			position = ((event.pageX - parentRef.current!.offsetLeft - 10) / 20) * 100;

			if (position < 0) {
				position = 0;
			}

			if (position > 100) {
				position = 100;
			}

			updateValue(false);

			updatePosition(current!);

			blockClick = true;
		},
		endHandler: (event, { current }) => {
			updateValue();

			updatePosition(current!);

			ref.current.classList.remove('js-dragging');

			// timeout to fix race condition with onClick event.
			setTimeout(() => (blockClick = false));
		},
	});

	return (
		<style.ToggleStyle
			ref={parentRef}
			onClick={() => {
				if (blockClick) return;

				position = position > 50 ? 0 : 100;

				updateValue();

				updatePosition(ref.current);
			}}
		>
			<style.InputStyle
				formGroup={formGroup}
				formKey={formKey}
				type='checkbox'
				{...props}
				hook={newValue => {
					if (newValue === value) return;

					position = newValue ? 100 : 0;

					updateValue();

					updatePosition(ref.current!);
				}}
			/>
			<style.Bar />
			<style.Dragger
				style={{
					transform: `translateX(${position}%)`,
				}}
				ref={ref}
			/>
		</style.ToggleStyle>
	);
}

export default Toggle;
