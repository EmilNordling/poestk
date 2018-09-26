import React, { Fragment } from 'react';
import styled from 'styled-components';
import { TransitionGroup } from 'react-transition-group';
import { inject, observer, propTypes } from 'mobx-react';
import GUIStore from '../stores/GUIStore';
import transition from 'styled-transition-group';
import { colors } from '../constants';

interface ModalProps {
  guiStore?: GUIStore;
}

const Overlay = transition.div.attrs({
  unmountOnExit: true,
  timeout: 200,
})`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  background: rgba(0, 0, 0, 0.5);
  transition: opacity 200ms ease;
  contain: strict;

  &:enter {
    opacity: 0.01;
  }
  &:enter-active {
    opacity: 1;
  }
  &:exit {
    opacity: 1;
  }
  &:exit-active {
    opacity: 0.01;
  }
`;

const ModalStyle = styled.div`
  max-width: 480px;
  width: 100%;
  padding: 40px;
  background: ${colors.content};
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
  pointer-events: auto;
  contain: layout;
`;

const ModalWrapper = transition.div.attrs({
  unmountOnExit: true,
  timeout: 200,
})`
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
  transition: transform 200ms ease, opacity 200ms ease;
  will-change: transform;
  transform: scale(1) translateY(0);

  &:enter {
    opacity: 0.01;
    transform: scale(0) translateY(-500px);
  }

  &:enter-active {
    opacity: 1;
    transform: scale(1) translateY(0);
  }

  &:exit {
    opacity: 1;
    transform: scale(1) translateY(0);
  }

  &:exit-active {
    opacity: 0.01;
    transform: scale(0) translateY(500px);
  }
`;

@inject('guiStore')
@observer
class Modal extends React.Component<ModalProps, any> {
  private popModal = () => {
    this.props.guiStore!.popModal();
  }

  render() {
    const { guiStore } = this.props;

    return (
      <Fragment>
        <TransitionGroup>
          {guiStore!.modals.length > 0 &&
            <Overlay onClick={this.popModal} />
          }
        </TransitionGroup>
        <TransitionGroup>
          {guiStore!.modals.length > 0 &&
            <ModalWrapper>
              <ModalStyle>
                {guiStore!.modal}
              </ModalStyle>
            </ModalWrapper>
          }
        </TransitionGroup>
      </Fragment>
    );
  }
}

export default Modal;
