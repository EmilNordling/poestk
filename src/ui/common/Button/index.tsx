import React from 'react';
import { ButtonComponent } from './types';
import style from './style';

const Button: React.FC<ButtonComponent.Props> = ({ children, ...rest }) => {
	return <style.Button {...rest}>{children}</style.Button>;
};

export default Button;
