import React from 'react';
import style from './style';
import { HomeComponent } from './types';
import SplashBackground from '../../../ui/containers/SplashBackground';

const Home: React.FC<HomeComponent.Props> = () => {
	return (
		<style.Content>
			<SplashBackground />
		</style.Content>
	);
};

export default Home;
