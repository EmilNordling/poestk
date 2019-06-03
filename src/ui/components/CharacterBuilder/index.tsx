import React, { Fragment } from 'react';
import style from './style';
import { CharacterBuilderComponent } from './types';
import SidePanel from '../../../pages/sandbox/Sandbox/SidePanel';

const CharacterBuilder: React.FC<CharacterBuilderComponent.Props> = () => {
	return (
		<Fragment>
			<SidePanel />
		</Fragment>
	);
};

export default CharacterBuilder;
