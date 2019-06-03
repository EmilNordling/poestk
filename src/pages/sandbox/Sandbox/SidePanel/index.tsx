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

	const handleMouseDown = (event: React.MouseEvent, view: Views) => {
		const which = event.nativeEvent.which;

		if (which === 1) { // Left click
			setView(view);
		}
	};

	return (
		<style.Content>
			<style.Header>
				<style.HeaderItemRow>
					<style.HeaderItem
						onMouseDown={event => handleMouseDown(event, Views.stats)}
						className={view === Views.stats ? 'active' : ''}
					>
						stats
					</style.HeaderItem>
					<style.HeaderItem
					onMouseDown={event => handleMouseDown(event, Views.items)}
						className={view === Views.items ? 'active' : ''}
					>
						items
					</style.HeaderItem>
				</style.HeaderItemRow>
			</style.Header>
			{view === Views.stats &&
				<Stats character={character} />
			}
			{view === Views.items &&
				<style.InnerContainer>
					<ItemArea />
				</style.InnerContainer>
			}
		</style.Content>
	);
};

export default SidePanel;
