import styled from 'styled-components';
import { colors } from '../../../../modules/theme/colors';

const Footer = styled.div`
	border-top: 1px solid ${colors.border};
	box-sizing: content-box;
	background: ${colors['sandbox.bottomBar.background']};
	height: 20px;
	flex-shrink: 0;
`;

export default {
	Footer,
};
