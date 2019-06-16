import React, { useState, useEffect } from 'react';
import style from './style';
import { SelectionComponent } from './types';
import shortid from 'shortid';
import { CSSTransition } from 'react-transition-group';
import GuiStore from '../../../stores/GuiStore';
import isFocused from '../../../helpers/isFocused';

type ItemProps = {
	index: number;
	currentSelectedIndex: number;
	setCurrentSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
};

const Item: React.FC<SelectionComponent.Item & ItemProps> = ({
	description,
	shortcut,
	group,
	action,
	index,
	currentSelectedIndex,
	setCurrentSelectedIndex,
}) => {
	return (
		<style.Item
			onClick={action}
			isFocused={index === currentSelectedIndex}
			onMouseMove={() => setCurrentSelectedIndex(index)}
			onFocus={() => setCurrentSelectedIndex(index)}
			onBlur={() => setCurrentSelectedIndex(-1)}
		>
			<style.ItemGroup>{description}</style.ItemGroup>
			<style.ItemGroup>{shortcut}</style.ItemGroup>
		</style.Item>
	);
};

const Selection: React.FC<SelectionComponent.Props> = ({ actions }) => {
	let numberOfSeparators = 0;
	let itemIndex = 0;

	const showSelection = GuiStore.selections.length !== 0;

	const [currentSelectedIndex, setCurrentSelectedIndex] = useState(-1);

	const itemList = actions.flatMap((group, index) => {
		const jsxGroup: JSX.Element[] = group.map(item => {
			itemIndex++;

			return (
				<Item
					key={shortid.generate()}
					index={itemIndex - 1}
					currentSelectedIndex={currentSelectedIndex}
					setCurrentSelectedIndex={setCurrentSelectedIndex}
					{...item}
				/>
			);
		});

		if (index !== actions.length - 1) {
			jsxGroup.push(<style.Separator key={`__sep__${numberOfSeparators}`} />);
			numberOfSeparators++;
		}

		return jsxGroup;
	});

	useEffect(() => {
		const downHandler = (event: KeyboardEvent) => {
			let newIndex = currentSelectedIndex;
			const itemListLength = itemList.length - 1 - numberOfSeparators;

			switch (event.key) {
				case 'ArrowDown':
					newIndex++;

					if (newIndex > itemListLength) newIndex = 0;

					break;
				case 'ArrowUp':
					newIndex--;

					if (newIndex < 0) newIndex = itemListLength;
					break;
				case 'Escape':
					newIndex = -1;

					break;
			}

			if (document.activeElement) (document.activeElement as HTMLElement).blur();

			setCurrentSelectedIndex(newIndex);
		};

		const upHandler = (event: KeyboardEvent) => {
			switch (event.key) {
				case 'Enter':
					if (currentSelectedIndex !== -1 && !isFocused(event)) {
						const { action } = actions.flatMap(item => item)[currentSelectedIndex];

						if (action) action(event);
					}

					break;
			}
		};

		addEventListener('keydown', downHandler);
		addEventListener('keyup', upHandler);

		return () => {
			removeEventListener('keydown', downHandler);
			removeEventListener('keyup', upHandler);
		};
	}, [currentSelectedIndex]);

	return (
		<CSSTransition in={true} timeout={300} unmountOnExit={true} classNames='animation'>
			<style.Container blocksUserInput={true} onMouseLeave={() => setCurrentSelectedIndex(-1)}>
				<div>{itemList}</div>
			</style.Container>
		</CSSTransition>
	);
};

export default Selection;
