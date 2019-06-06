import styled, { css } from 'styled-components';
import { colors } from '../../../modules/theme/colors';
import BaseButton from '../../base/BaseButton';
import { SelectionComponent } from './types';

const Container = styled.div<SelectionComponent.Style>`
	width: 200px;
	overflow: auto;
	top: 200px;
	left: 400px;
	position: absolute;
	z-index: 1000;
	background: ${colors.foreground};
	padding: 5px 0;
	box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.39);
	transition: transform 300ms ease, opacity 200ms ease;
  will-change: transform;
	transform: scale(1) translateY(0);
	border-radius: 3px;

  &.animation-enter {
    opacity: 0.01;
    transform: scale(0.9) translateY(-10px);
  }
  &.animation-enter-active {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  &.animation-exit {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  &.animation-exit-active {
    opacity: 0.01;
    transform: scale(0.9) translateY(10px);
  }

	${({ blocksUserInput }) => blocksUserInput && css`


    &:after {
			content: '';
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 999;
		}
  `};
`;

const Item = styled(BaseButton)<{ isFocused: boolean }>`
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: 6px 10px;
	font-size: 0.8rem;
	cursor: pointer;
	text-transform: capitalize;
	user-select: none;

	${({ isFocused }) => isFocused && 'background: rgba(3, 3, 3, 0.21);'}
`;

const ItemGroup = styled.div`

`;

const ItemIcon = styled.div`
	padding: 0 5px;
`;

const Separator = styled.div`
	display: flex;
	align-items: center;
	padding: 0 5px;
	width: 100%;
	height: 10px;

	&:after {
		content: '';
		width: 100%;
		border-top: 1px solid ${colors.border};
	}
`;

export default {
	ItemGroup,
	Item,
	Container,
	Separator,
	ItemIcon,
};
