import React from 'react';
import style from './style';
import { NavigationBarComponent } from './types';
import Icon from '../../../../ui/common/Icon';

const NavigationBar: React.FC<NavigationBarComponent.Props> = () => {
	return (
		<style.Nav>
			<style.Group>
				<style.ButtonStatic>
					<Icon icon='rocket' />
				</style.ButtonStatic>
			</style.Group>
			<style.Group>
			</style.Group>
		</style.Nav>
	);
};

export default NavigationBar;
