import React, { ButtonHTMLAttributes, useRef, useState } from 'react';
import style from './style';
import { BaseButtonComponent } from './types';

const BaseButton: React.FC<BaseButtonComponent.Props> = props => {
	const {
		// Takes out these values to be used as variables here.
		children,
		className,
		disabled,
		// Takes out focus events for override.
		onBlur,
		onFocus,
		// Takes out mouse events for override.
		onClick,
		onMouseDown,
		onMouseUp,
		onMouseLeave,
		// Takes out keyboard events for override.
		onKeyUp,
		onKeyDown,
		// Takes out touch events for override.
		onTouchEnd,
		onTouchMove,
		onTouchStart,
		// defaults.
		tabIndex = 0,
		type = 'button',
		// Spreads anything else.
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
		console.log(event);
	};
	const handleKeyUp = (event: React.KeyboardEvent<HTMLButtonElement>) => {};

	// Touch events
	const handleTouchStart = (event: React.TouchEvent<HTMLButtonElement>) => {};
	const handleTouchEnd = (event: React.TouchEvent<HTMLButtonElement>) => {};
	const handleTouchMove = (event: React.TouchEvent<HTMLButtonElement>) => {};

	return (
		<style.BaseButton
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
		</style.BaseButton>
	);
};

export default BaseButton;
