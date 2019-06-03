import styled from 'styled-components';
import { colors } from '../../../../modules/theme/colors';

const Header = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	border-bottom: 1px solid #000000;
	flex-shrink: 0;
	margin-bottom: 30px;
	background: #0c0c0c;
	box-shadow: 0 0px 4px rgba(0, 0, 0, 0.82);
`;

const HeaderItemRow = styled.div`
	display: flex;
	background: #1b1b1b;
	border-bottom: 1px solid #000000;
`;

const HeaderItem = styled.div`
	padding: 5px 15px;
	box-sizing: border-box;
	font-size: 0.8rem;
	text-transform: capitalize;
	user-select: none;
	cursor: pointer;
	color: rgba(255, 255, 255, 0.64);

	&.active {
		background: #272727;
		color: #ffffff;
	}
`;

const Content = styled.div`
	display: flex;
	width: 350px;
	background: ${colors['sandbox.sidePanel.background']};
	border-right: 1px solid ${colors.border};
	align-items: flex-start;
	flex-direction: column;
	overflow: hidden;
`;

const InnerContainer = styled.div`
	padding: 0 10px;
`;

const StatItem = styled.div`
	padding: 0 10px 10px;
	width: 100%;

	&:after {
		content: '';
    width: 100%;
    height: 1px;
    display: block;
    margin-top: 10px;
    background: ${colors.border};
	}
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
	HeaderItemRow,
	HeaderItem,
	Header,
	InnerContainer,
	Content,
	StatItem,
	StatsDisplayStyle,
	Description,
	Value,
};
