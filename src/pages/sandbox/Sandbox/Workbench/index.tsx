import React, { Fragment } from 'react';
import style from './style';
import { WorkbenchComponent } from './types';
import { observer } from 'mobx-react-lite';
import BuildStore from '../../../../stores/BuildStore';
import TabBar from '../TabBar';
import Paragraph from '../../../../ui/common/Paragraph';
import PassiveTreePortal from '../PassiveTreePortal';
import SidePanel from '../SidePanel';

const Workbench: React.FC<WorkbenchComponent.Props> = () => {
	if (BuildStore.selectedIndex === undefined) {
		return (
			<style.MissingBuild>
				<Paragraph italic color='rgba(255, 255, 255, 0.2)'>(ง'̀-'́)ง</Paragraph>
				{/* <SplashBackground /> */}
			</style.MissingBuild>
		);
	}

	return (
		<Fragment>
			<TabBar />
			<style.Content>
				<SidePanel character={BuildStore.builds[BuildStore.selectedIndex - 1].character} />
				<PassiveTreePortal />
			</style.Content>
		</Fragment>
	);
};

export default observer(Workbench);
