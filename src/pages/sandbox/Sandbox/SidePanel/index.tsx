import React, { useState } from 'react';
import style from './style';
import { SidePanelComponent } from './types';
import Paragraph from '../../../../ui/common/Paragraph';
import Stats from './Stats';
import { useObservable } from 'mobx-react-lite';
import ItemArea from '../ItemArea';

enum Views {
	stats,
	items,
}

const SidePanel: React.FC<SidePanelComponent.Props> = ({ character }) => {
	const [view, setView] = useState<Views>(Views.stats);

	const handleMouseDown = (event: React.MouseEvent, newView: Views) => {
		const which = event.nativeEvent.which;

		if (which === 1) {
			// Left click
			setView(newView);
		}
	};

	const handleMouseClick = (event: React.MouseEvent, newView: Views) => {
		console.log(newView);

		if (view !== newView) {
			setView(newView);
		}
	};

	return (
		<style.Content>
			<style.Header>
				<style.HeaderItem
					type='button'
					onMouseDown={event => handleMouseDown(event, Views.stats)}
					className={view === Views.stats ? 'active' : ''}
					onClick={event => handleMouseClick(event, Views.stats)}
				>
					stats
				</style.HeaderItem>
				<style.HeaderItem
					type='button'
					onMouseDown={event => handleMouseDown(event, Views.items)}
					className={view === Views.items ? 'active' : ''}
					onClick={event => handleMouseClick(event, Views.items)}
				>
					items
				</style.HeaderItem>
			</style.Header>
			{view === Views.stats && <Stats character={character} />}
			{view === Views.items && (
				<style.InnerContainer>
					<ItemArea />
				</style.InnerContainer>
			)}
		</style.Content>
	);
};

export default SidePanel;
