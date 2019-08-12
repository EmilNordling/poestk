import React, { useRef, useEffect } from 'react';
import style from './style';
import { PassiveTreePortalComponent } from './types';
import init from '../../../../modules/passiveTree/SkillTree';

const PassiveTreePortal: React.FC<PassiveTreePortalComponent.Props> = () => {
	const passiveTreeRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (passiveTreeRef.current) init(passiveTreeRef.current);
	}, []);

	return (
		<style.Content>
			<canvas ref={passiveTreeRef} />
		</style.Content>
	);
};

export default PassiveTreePortal;
