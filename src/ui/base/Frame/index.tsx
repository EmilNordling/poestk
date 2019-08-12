import React from 'react';
import { FrameComponent } from './types';
import style from './style';

const Frame: React.FC<FrameComponent.Props> = ({ ...rest }) => {
	return (
		<style.FrameStyle>
			<div>qwe</div>
		</style.FrameStyle>
	);
};

export default Frame;
