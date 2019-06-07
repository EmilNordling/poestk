import React, { ButtonHTMLAttributes, useRef, useState } from 'react';
import styled from 'styled-components';

const Style = styled.button`
	border: none;
	margin: 0;
	padding: 0;
	width: auto;
	overflow: visible;
	background: transparent;
	color: inherit;
	font: inherit;
	line-height: normal;
	-webkit-font-smoothing: inherit;
	-moz-osx-font-smoothing: inherit;
	-webkit-appearance: none;
	cursor: pointer;
`;

const BaseButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
	const {
		children,
		className,
		disabled,

		onBlur,
		onFocus,

		onClick,
		onMouseDown,
		onMouseUp,
		onMouseLeave,

		onKeyUp,
		onKeyDown,

		onTouchEnd,
		onTouchMove,
		onTouchStart,
		tabIndex = 0,
		type = 'button',
		...rest
	} = props;

	const buttonRef = useRef<HTMLButtonElement>(null);
	const [focusVisible, setFocusVisible] = useState(false);

	if (disabled && focusVisible) setFocusVisible(false);

	// Focus events
	const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
		if (onBlur) onBlur(event);
	};
	const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
		if (onFocus) onFocus(event);
	};

	// Mouse events
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (onClick) onClick(event);
	};
	const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (onMouseDown) onMouseDown(event);
	};
	const handleMouseUp = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (onMouseUp) onMouseUp(event);
	};
	const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (onMouseLeave) onMouseLeave(event);
	};

	// Keyboard events
	const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
		console.log(event)
	};
	const handleKeyUp = (event: React.KeyboardEvent<HTMLButtonElement>) => {

	};

	// Touch events
	const handleTouchStart = (event: React.TouchEvent<HTMLButtonElement>) => {

	};
	const handleTouchEnd = (event: React.TouchEvent<HTMLButtonElement>) => {

	};
	const handleTouchMove = (event: React.TouchEvent<HTMLButtonElement>) => {

	};

	return (
		<Style
			ref={buttonRef}
			className={className}
			disabled={disabled}
			tabIndex={disabled ? -1 : tabIndex}
			onBlur={handleBlur}
			onClick={handleClick}
			onFocus={handleFocus}
			onKeyDown={handleKeyDown}
			onKeyUp={handleKeyUp}
			onMouseDown={handleMouseDown}
			onMouseLeave={handleMouseLeave}
			onMouseUp={handleMouseUp}
			onTouchEnd={handleTouchEnd}
			onTouchMove={handleTouchMove}
			onTouchStart={handleTouchStart}
			type={type}
			{...rest}
		>
			{children}
		</Style>
	);
};

export default BaseButton;
