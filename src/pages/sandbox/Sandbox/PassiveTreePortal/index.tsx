import React, { useRef, useEffect } from 'react';
import style from './style';
import { PassiveTreePortalComponent } from './types';

const PassiveTreePortal: React.FC<PassiveTreePortalComponent.Props> = () => {
	const passiveTreeRef = useRef(null);

	return (
		<style.Content ref={passiveTreeRef}>

		</style.Content>
	);
};

export default PassiveTreePortal;
