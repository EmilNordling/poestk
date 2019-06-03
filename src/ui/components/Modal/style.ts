import styled from 'styled-components';
import { colors } from '../../../modules/theme/colors';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  background: rgba(0, 0, 0, 0.5);
  transition: opacity 500ms ease;
  contain: strict;
  cursor: pointer;

  &.animation-enter {
    opacity: 0;
  }
  &.animation-enter-active {
    opacity: 1;
  }
  &.animation-exit {
    opacity: 1;
  }
  &.animation-exit-active {
    opacity: 0;
  }
`;

const ModalWrapper = styled.div`
  pointer-events: none;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  transition: transform 300ms ease, opacity 200ms ease;
  will-change: transform;
  transform: scale(1) translateY(0);
  padding: 0 20px;

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
`;

const ModalStyle = styled.div`
  max-width: 780px;
  min-width: 300px;
  background: ${colors.remove};
  border-radius: 5px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
  pointer-events: auto;
  contain: layout;
  overflow: hidden;
	transition: background-color ease 200ms;
`;

export default {
	Overlay,
	ModalWrapper,
	ModalStyle,
};
