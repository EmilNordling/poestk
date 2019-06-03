import styled from 'styled-components';
import { colors } from '../../../../modules/theme/colors';
import BaseButton from '../../../../ui/base/BaseButton';

const TabBar = styled.div`
	height: 30px;
	box-sizing: content-box;
	background: ${colors['sandbox.bottomBar.background']};
	display: flex;
	align-items: center;
	flex-shrink: 0;
	border-bottom: 1px solid #000000;
`;

const Button = styled(BaseButton)`
	padding: 0 7px;
	display: flex;
	height: 100%;
	align-items: center;
	font-size: 0.7rem;
	cursor: pointer;
	border-right: 1px solid #000000;
	min-width: 5pc;
	background: #171717;
	color: rgba(255, 255, 255, 0.64);

	&.active {
		background: #272727;
		color: #ffffff;
	}

	&:focus {
		z-index: 1;
	}
`;

export default {
	TabBar,
	Button,
};
