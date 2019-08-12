import React from 'react';
import style from './style';
import { HomeComponent } from './types';
import SplashBackground from '../../../ui/containers/SplashBackground';
import Button from '../../../ui/common/Button';

const Home: React.FC<HomeComponent.Props> = () => {
	return (
		<style.Content>
			<Button>qwe</Button>
			<SplashBackground />
		</style.Content>
	);
};

export default Home;
