import styled from 'styled-components';
import { colors } from '../../../../modules/theme/colors';
import BaseButton from '../../../../ui/base/BaseButton';

const Header = styled.div`
	display: flex;
	width: 100%;
	flex-shrink: 0;
	margin-bottom: 30px;
	border-bottom: 1px solid #000000;
`;

const HeaderItem = styled(BaseButton)`
	flex: 1;
	text-align: center;
	padding: 8px 15px;
	box-sizing: border-box;
	font-size: 0.8rem;
	text-transform: capitalize;
	cursor: pointer;
	color: rgba(255, 255, 255, 0.64);
	border-right: 1px solid #000000;

	&.active {
		background: #272727;
		color: #ffffff;
	}

	&:last-of-type {
		border-right: none;
	}
`;

const Content = styled.div`
	display: flex;
	width: 350px;
	background: ${colors['sandbox.sidePanel.background']};
	border-right: 1px solid #000000;
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
	HeaderItem,
	Header,
	InnerContainer,
	Content,
	StatItem,
	StatsDisplayStyle,
	Description,
	Value,
};
