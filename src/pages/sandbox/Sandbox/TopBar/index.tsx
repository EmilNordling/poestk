import React from 'react';
import style from './style';
import { TopBarComponent } from './types';



const TopBar: React.FC<TopBarComponent.Props> = () => {
	const handleClick = () => {
		console.log('xd')
	};

	return (
		<style.Container>
			<style.Button tabIndex={0} onClick={handleClick}>File</style.Button>
			<style.Button tabIndex={0} onClick={handleClick}>File</style.Button>
			<style.Button tabIndex={0} onClick={handleClick}>File</style.Button>
			<style.Button tabIndex={0} onClick={handleClick}>File</style.Button>
		</style.Container>
	);
};

export default TopBar;
