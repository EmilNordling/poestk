import styled from 'styled-components';
import BaseButton from '../../base/BaseButton';

const Button = styled(BaseButton)`
	font-size: 0.875rem;
	padding: 0 8px 0 8px;
	display: inline-flex;
	position: relative;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	min-width: 64px;
	height: 36px;
	line-height: inherit;
	user-select: none;
	overflow: hidden;
	vertical-align: middle;
	border-radius: 4px;
	background: red;
`;

export default {
	Button,
};
