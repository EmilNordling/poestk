import React, { useState, useEffect } from 'react';
import style from './style';
import { SelectionComponent } from './types';
import shortid from 'shortid';

type ItemProps = {
	index: number,
	currentSelectedIndex: number,
	setCurrentSelectedIndex: React.Dispatch<React.SetStateAction<number>>,
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
		>
			<style.ItemGroup>
				{description}
			</style.ItemGroup>
			<style.ItemGroup>
				{shortcut}
			</style.ItemGroup>
		</style.Item>
	);
};

const Selection: React.FC<SelectionComponent.Props> = ({ actions }) => {
	let numberOfSeparators = 0;
	let itemIndex = 0;

	const [currentSelectedIndex, setCurrentSelectedIndex] = useState(-1);

	const itemList = actions.flatMap((group, index) => {
		const jsxGroup: JSX.Element[] = group.map((item) => {
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
			jsxGroup.push(<style.Separator key={shortid.generate()} />);
			numberOfSeparators++;
		}

		return jsxGroup;
	});

	useEffect(() => {
		const downHandler = (event: KeyboardEvent) => {
			event.stopPropagation();

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

			setCurrentSelectedIndex(newIndex);
		};

		const upHandler = (event: KeyboardEvent) => {
			event.stopPropagation();

			switch (event.key) {
				case 'Enter':
					if (currentSelectedIndex !== -1) {
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
		<style.Container onMouseLeave={() => setCurrentSelectedIndex(-1)}>
			<div>
				{itemList}
			</div>
		</style.Container>
	);
};

export default Selection;
