import { InputBaseComponent } from '../../base/InputBase/types';

export namespace ToggleComponent {
	export interface Props<T> extends InputBaseComponent.Props<T> {
		isActive?: boolean;
	}
}
