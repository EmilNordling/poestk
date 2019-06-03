import styled from 'styled-components';
import { colors } from '../../../../modules/theme/colors';

const TabBar = styled.div`
	height: 30px;
	box-sizing: content-box;
	background: ${colors['sandbox.bottomBar.background']};
	display: flex;
	align-items: center;
	flex-shrink: 0;
	border-bottom: 1px solid #000000;
`;

const Content = styled.div`
	width: 330px;
	height: 330px;
`;

const ItemContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
	grid-column-gap: 10px;
	grid-row-gap: 10px;
	height: 100%;
	width: 100%;

	.helmet { grid-area: 1 / 4 / 3 / 6; }

	.armour { grid-area: 3 / 4 / 6 / 6; }

	.belt { grid-area: 6 / 4 / 7 / 6; }

	.boots { grid-area: 5 / 6 / 7 / 8; }

	.gloves { grid-area: 5 / 2 / 7 / 4; }

	.weapon1 { grid-area: 1 / 1 / 5 / 3; }

	.weapon2 { grid-area: 1 / 7 / 5 / 9; }

	.ring1 { grid-area: 4 / 3 / 5 / 4; }

	.ring2 { grid-area: 3 / 6 / 4 / 7; }

	.amulet { grid-area: 4 / 6 / 5 / 7; }

	.belts { grid-area: 7 / 2 / 9 / 8; }
`;

const Item = styled.div`
	background: #0c0c0c;
	border: 1px solid #232323;
`;

export default {
	Item,
	TabBar,
	Content,
	ItemContainer,
};
