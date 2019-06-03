import styled from 'styled-components';
import { colors } from '../../../../modules/theme/colors';
import BaseButton from '../../../../ui/base/BaseButton';

const Container = styled.div`
	flex-shrink: 0;
	border-bottom: 1px solid ${colors.border};
	box-sizing: content-box;
	background: ${colors['sandbox.bottomBar.background']};
	height: 25px;
	display: flex;
	align-items: center;
`;

const Button = styled(BaseButton)`
	padding: 0 7px;
	display: flex;
	height: 100%;
	align-items: center;
	font-size: 0.7rem;
	cursor: pointer;
	color: rgba(255, 255, 255, 0.64);

	&:hover {
		background: rgba(218, 190, 255, 0.14);
	}
`;

export default {
	Container,
	Button,
};
