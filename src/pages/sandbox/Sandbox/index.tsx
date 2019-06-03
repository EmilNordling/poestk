import React from 'react';
import style from './style';
import { SandboxComponent } from './types';
import NavigationBar from './NavigationBar';
import BottomBar from './BottomBar';
import TopBar from './TopBar';
import Workbench from './Workbench';

const Sandbox: React.FC<SandboxComponent.Props> = ({ match }) => {
	return (
		<style.Sandbox>
			<TopBar />
			<style.Content>
				<NavigationBar />
				<style.ContentPortal>
					<Workbench />
				</style.ContentPortal>
			</style.Content>
			<BottomBar />
		</style.Sandbox>
	);
};

export default Sandbox;
