import styled from 'styled-components';
import { colors } from '../../../../modules/theme/colors';

const Content = styled.div`
	display: flex;
	width: 300px;
	background: ${colors['sandbox.sidePanel.background']};
	border-right: 1px solid ${colors.border};
	align-items: flex-start;
`;

const StatItem = styled.div`
	padding: 10px;
	width: 100%;
`;

const StatsDisplayStyle = styled.div`
	display: flex;
`;

const Description = styled.div`
	flex: 1 1 0%;
`;

const Value = styled.div`
	margin-left: 10px;
	flex: 1 1 0%;
`;

export default {
	Content,
	StatItem,
	StatsDisplayStyle,
	Description,
	Value,
};
