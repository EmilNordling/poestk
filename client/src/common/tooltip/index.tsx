import React, { Component } from 'react';
import styled from 'styled-components';
import { TransitionGroup } from 'react-transition-group';
import transition from 'styled-transition-group';
import { colors } from '../../constants';

interface TooltipProps {
  text: string;
}

const Arrow = styled.div`
  position: absolute;
  bottom: -12px;
  left: calc(50% - 12px);
  width: 6px;
  height: 6px;
  margin: 6px;

  &::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: inherit;
    border-color: ${colors.main_background};
  }

  &::before {
    background-color: inherit;
    border-width: 6px 6px 0;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
  }

  &::after {
    background-color: inherit;
    border-width: 6px 6px 0;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
  }
`;

const TooltipStyle = styled.div`
  position: relative;
  display: inline-block;
  user-select: none;
`;

const TooltipPopout = transition.div.attrs({
  unmountOnExit: true,
  timeout: 125,
})`
  position: absolute;
  transition: opacity 125ms, transform 125ms;
  will-change: transform;
  top: calc(-100% - 5px);
  transform: translateY(-50%) translateX(-50%);
  left: 50%;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 1.6rem;
  background-color: ${colors.main_background};
  box-shadow: 0 2px 7px 1px rgba(0, 0, 0, 0.22);

  &:enter {
    opacity: 0;
  }

  &:enter-active {
    opacity: 1;
  }

  &:exit {
    opacity: 1;
  }

  &:exit-active {
    opacity: 0;
  }
`;

class Tooltip extends Component<TooltipProps> {
  public state = {
    hovering: false,
  };

  private hoverOver = () => {
    this.setState({
      hovering: true,
    });
  }

  private hoverOut = () => {
    this.setState({
      hovering: false,
    });
  }

  render() {
    const { children, text, ...rest } = this.props;
    const { hovering } = this.state;

    return (
      <TooltipStyle {...rest} onMouseEnter={this.hoverOver} onMouseOut={this.hoverOut}>
        <TransitionGroup>
          {hovering &&
            <TooltipPopout>
              <Arrow />
              {text}
            </TooltipPopout>
          }
        </TransitionGroup>
        {children}
      </TooltipStyle>
    );
  }
}

export default Tooltip;
