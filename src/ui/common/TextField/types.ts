import { InputBaseComponent } from '../../base/InputBase/types';
import { Icons } from '../Icon/iconMap';

export namespace TextFieldComponent {
	export type Variant = 'standard';

	export interface Props<T> extends InputBaseComponent.Props<T> {
		helperText?: string;
		icon?: Icons;
		variant?: Variant;
		example?: string;
		multiline?: boolean;
		fixedWidth?: number;
	}

	export interface State {
		error: string | null;
	}
}
