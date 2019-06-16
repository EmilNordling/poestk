import React from 'react';
import style from './style';
import { TabBarComponent } from './types';
import { observer } from 'mobx-react-lite';
import BuildStore from '../../../../stores/BuildStore';
import shortid from 'shortid';

const TabBar: React.FC<TabBarComponent.Props> = () => {
	const handleMouseDown = (event: React.MouseEvent, tabIndex: number) => {
		const which = event.nativeEvent.which;

		if (which === 1) {
			// Left click
			BuildStore.selectIndex(tabIndex);
		}
	};

	const handleContextMenu = (event: React.MouseEvent) => {};

	return (
		<style.TabBar>
			{BuildStore.builds.map(build => {
				return (
					<style.Button
						type='button'
						draggable
						tabIndex={0}
						key={shortid.generate()}
						onMouseDown={event => handleMouseDown(event, build.tabIndex)}
						onContextMenu={handleContextMenu}
						className={
							build.tabIndex === BuildStore.selectedIndex ? 'active' : ''
						}
					>
						{build.name}
					</style.Button>
				);
			})}
		</style.TabBar>
	);
};

export default observer(TabBar);
