import React from 'react';
import style from './style';
import { ItemAreaComponent } from './types';
import { observer } from 'mobx-react-lite';

const ItemArea: React.FC<ItemAreaComponent.Props> = () => {
	return (
		<style.Content>
			<style.ItemContainer>
				<style.Item className='helmet'></style.Item>
				<style.Item className='armour'></style.Item>
				<style.Item className='belt'></style.Item>
				<style.Item className='boots'></style.Item>
				<style.Item className='gloves'></style.Item>
				<style.Item className='weapon1'></style.Item>
				<style.Item className='weapon2'></style.Item>
				<style.Item className='ring1'></style.Item>
				<style.Item className='ring2'></style.Item>
				<style.Item className='amulet'></style.Item>
				<style.Item className='belts'></style.Item>
			</style.ItemContainer>
		</style.Content>
	);
};

export default observer(ItemArea);
