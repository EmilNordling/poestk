import styled from 'styled-components';
import { colors } from '../../../modules/theme/colors';

const Sandbox = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	width: 100%;
	background: ${colors['sandbox.background']};
`;

const Content = styled.div`
	display: flex;
	height: 100%;
	background: ${colors['sandbox.background']};
`;

const ContentPortal = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export default {
	Content,
	Sandbox,
	ContentPortal,
};
