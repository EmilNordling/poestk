import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { colors } from '../../../../modules/theme/colors';

const Nav = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	width: 40px;
	background: ${colors['sandbox.navigationBar.background']};
	border-right: 1px solid ${colors.border};
	transition: background-color, border ease 200ms;
`;

const ButtonStyle = css`
	margin-top: 5px;
	display: flex;
	height: 40px;
	width: 40px;
	justify-content: center;
	align-items: center;
	color: #ffffff;
	cursor: pointer;
	transition: color 200ms ease;

	& svg {
		font-size: 20px;
	}

	&:hover {
		color: ${colors.remove};
	}
`;

const Button = styled(NavLink)`
	${ButtonStyle}

	&.active {
		color: ${colors.remove};
	}
`;

const ButtonStatic = styled.div`
	${ButtonStyle}
`;

const Group = styled.div`

`;

export default {
	Nav,
	Button,
	ButtonStatic,
	Group,
};
