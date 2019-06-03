import React from 'react';
import { Observer, useObservable } from 'mobx-react-lite';
import { InputStyle } from './style';
import { InputBaseComponent } from './types';
import { FormGroup } from '../../../modules/formGroup';

/**
 * Form update handler.
 */
function handleFormChange<T>(event: React.FormEvent<HTMLInputElement>, form: FormGroup<T>, formKey: keyof T) {
	const type = event.currentTarget.type;
	let value;

	switch (type) {
		case 'checkbox':
			value = !JSON.parse(event.currentTarget.value);

			break;
		default:
			value = event.currentTarget.value;
	}

	form.push(formKey as Extract<keyof T, string>, value);
}

/**
 * Base component for inputs.
 */
function InputBase<T>({
	formKey,
	formGroup,
	type,
	onChange,
	hook,
	...props
}: InputBaseComponent.Props<T>): React.ReactElement<InputBaseComponent.Props<T>> {
	// Input is wrapped in an Observer if a formGroup is passed.
	if (formGroup) {
		//#region DEV ONLY
		// Removes exceptions in production. (reduces size and they are not needed there).
		if (process.env.NODE_ENV !== 'production') {
			const isUndefined = require('../../../helpers/isUndefined').default;

			if (isUndefined(formKey)) {
				throw new Error('formKey must be passed');
			}

			if (!formGroup.currentState().hasOwnProperty(formKey as string)) {
				throw new Error('formKey must match a key in formGroup');
			}
		}
		//#endregion

		const key = formKey as Extract<keyof T, string>;

		return (
			<Observer render={() => {
				const value = formGroup.pull(key);

				if (hook) hook(value);

				return (
					<InputStyle type={type} value={value} checked={type === 'checkbox' ? value : undefined} onChange={(event) => {
						handleFormChange<T>(event, formGroup, key);

						if (onChange) onChange(event);
					}} {...props} />
				);
			}} />
		);
	}

	const state = useObservable({ value: props.value || '' });

	const interceptOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		state.value = event.currentTarget.value;

		if (onChange) onChange(event);
	};

	// Else it'll return a plain input without style.
	return (
		<Observer render={() => {
			return (
				<InputStyle type={type} {...props} value={state.value} onChange={interceptOnChange} />
			);
		}} />
	);
}

export default InputBase;
