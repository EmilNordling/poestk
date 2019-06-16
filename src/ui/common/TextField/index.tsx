import React from 'react';
import { TextFieldComponent } from './types';
import { TextFieldStyle, InputWrapper, InputStyle, Border, HelperText, Label } from './style';
import shortid from 'shortid';
import Paragraph from '../Paragraph';
import { InputBaseComponent } from '../../base/InputBase/types';

function TextField<T>({
	icon,
	helperText,
	required,
	variant,
	placeholder,
	example,
	type,
	readOnly,
	disabled,
	fixedWidth,
	...props
}: TextFieldComponent.Props<T>) {
	const hash = shortid();

	return (
		<TextFieldStyle fixedWidth={fixedWidth}>
			<InputWrapper>
				<InputStyle
					placeholder={placeholder && example}
					type={type || 'text'}
					required={required}
					id={hash}
					readOnly={readOnly || disabled}
					{...props}
				/>

				<Border />

				{placeholder && (
					<Label htmlFor={hash}>
						<Paragraph>
							{required && '*'}
							{placeholder}
						</Paragraph>
					</Label>
				)}
			</InputWrapper>

			{helperText && <HelperText>{helperText}</HelperText>}
		</TextFieldStyle>
	);
}

export default TextField;
