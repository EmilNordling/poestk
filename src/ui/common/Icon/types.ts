import { Icons } from './iconMap';
import { SVGAttributes } from 'react';

export namespace IconComponent {
	export interface Props extends SVGAttributes<SVGElement> {
		icon: Icons;
	}

	export interface Style { }
}
