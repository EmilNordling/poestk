import React from 'react';
import style from './style';
import { SidePanelComponent } from './types';
import ItemArea from '../ItemArea';

const Items: React.FC<SidePanelComponent.Props> = ({ character }) => {
	return (
		<style.InnerContainer>
			<ItemArea />
		</style.InnerContainer>
	);
};

export default Items;
