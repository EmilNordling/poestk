
import { InputHTMLAttributes } from 'react';
import { FormGroup } from '../../../modules/formGroup';

export namespace InputBaseComponent {
	export interface Props<T> extends InputHTMLAttributes<HTMLInputElement> {
		required?: boolean;
		disabled?: boolean;
		formKey?: Extract<keyof T, string>;
		formGroup?: FormGroup<T>;
		hook?: (value: string | number | boolean) => void;
	}
}
