import React, { useRef, useEffect } from 'react';
import style from './style';
import { PassiveTreePortalComponent } from './types';
import ph from '../../../../modules/passiveTree/SkillTree';

const PassiveTreePortal: React.FC<PassiveTreePortalComponent.Props> = () => {
	const passiveTreeRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		console.log('?')

		if (passiveTreeRef.current) ph(passiveTreeRef.current);
	}, []);

	return (
		<style.Content>
			<canvas ref={passiveTreeRef} />
		</style.Content>
	);
};

export default PassiveTreePortal;
