import { observable } from 'mobx';

export interface FormGroup<T> {
	stateValueIsValid: (key: string, value: any) => boolean;
	pull: (key: string) => any;
	push: (key: string, value: any) => void;
	currentState: () => T;
	isValid: () => boolean;
}

interface FormControlGroup {
	value: PrimitiveValue;
	valid: boolean;
	touched: boolean;
	validators: ((value: PrimitiveValue) => boolean)[];
}

type PrimitiveValue = string | number | boolean;
type ValueValidation = (value: PrimitiveValue, validators?: any[]) => FormControlGroup;

interface Specification {
	[item: string]: PrimitiveValue | ValueValidation;
}

function formControl(defaultValue: PrimitiveValue, ...validators: any[]): FormControlGroup {
	return {
		value: defaultValue === null ? '' : defaultValue,
		valid: false,
		touched: false,
		validators: [...validators],
	};
}

function formGroup<T extends Specification>(group: T): FormGroup<T> {
	const builder: any = {}; // TODO: add interface to this

	for (const key in group) {
		const value = group[key];

		if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
			const [defaultValue, ...rest] = value;

			builder[key] = formControl(defaultValue, ...rest);
		} else {
			builder[key] = formControl(value);
		}
	}

	const state = observable(builder);

	const form = {
		state,
		stateValueIsValid: (key: keyof T, value: any): boolean => {
			const stateTarget = state[key];

			const validators = stateTarget.validators;

			if (validators.length === 0) return true;

			const isValid = validators.every(validator => validator(value));

			if (!isValid) {
				return false;
			}

			return true;
		},
		pull: (key: keyof T) => state[key].value,
		push: (key: keyof T, value: any) => {
			state[key].value = value;

			state[key].valid = form.stateValueIsValid(key, value);
		},
		currentState: () => {
			const builder: { [key: string]: any } = {};

			observable.map(state).forEach((value, key) => {
				builder[key] = value.value;
			});

			return builder as T;
		},
		isValid: () => {
			const currentState = form.currentState();

			const isValid = Object.entries(currentState).every(entry => form.stateValueIsValid(entry[0], entry[1]));

			return isValid;
		},
	};

	return form;
}

export {
	formControl,
};

export default formGroup;
