import styled from 'styled-components';
import { colors } from '../../../../modules/theme/colors';

const Content = styled.div`
	flex: 1;
	box-shadow: inset 0 0 13px rgba(0, 0, 0, 0.45);

	canvas {
		width: 100%;
		height: 100%;
	}
`;

export default {
	Content,
};
