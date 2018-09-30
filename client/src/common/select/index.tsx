import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { colors, fontFamily } from '../../constants';
import { TransitionGroup } from 'react-transition-group';
import transition from 'styled-transition-group';
import Icon from '../icon';
import { P } from '../text';
import { propTypes } from 'mobx-react';
import ThemeHolder from '../../utils/ThemeHolder';
import withTheme from '../../hoc/withTheme';

export type SelectValue = string;

export interface SelectProps {
  width?: number;
  options?: any;
  model?: string;
  selected?: string;
  onChange?: (value: SelectValue, model: string) => void;
  onSelect?: (value: SelectValue, option: React.ReactElement<any>) => any;
  onDeselect?: (value: SelectValue) => any;
}

export interface SelectOptionProps {
  value: string;
}

const SelectStyle = transition.div.attrs({
  unmountOnExit: true,
  timeout: 125,
})`
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  padding: 0;
  margin-top: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  z-index: 1;
  border-radius: 4px;
  background: ${colors.inputBackdrop};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transition: opacity 125ms, transform 125ms;
  will-change: transform;
  transform-origin: 50% 0;
  padding: 4px 0;

  &:enter {
    opacity: 0;
    transform: scale(0.95) translateY(-20px);
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
    opacity: 0;
    transform: scale(0.95) translateY(-20px);
  }
`;

const SelectItemStyle = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0 10px 10px;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.15);
  }

  ${props => props.selected && css`
    background: rgba(0, 0, 0, 0.15);
  `}
`;

const Wrapper = styled.div`
  position: relative;
  width: ${(props: { width?: number }) => props.width ? `${props.width}px` : '100%' };
  color: ${colors.color};
  user-select: none;
`;

const Input = withTheme(styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid ${colors.borderLight};
  background: ${colors.inputBackground};
  border-radius: ${() => ThemeHolder.useborderRadius ? '4px' : '0'};
  cursor: pointer;

  &:hover {

  }

  &:focus {
    outline: 0;
    background: ${colors.mainDarken};
  }

  & svg {
    position: relative;
    transition: transform 200ms, top 200ms, stroke-dasharray 200ms;
  }

  & .closed {
    top: 3px;
    stroke-dasharray: 140;
    transform: rotate(0deg);
  }

  & .open {
    top: 0;
    stroke-dasharray: 280;
    transform: rotate(-90deg);
  }
`);

export class Options extends Component<SelectOptionProps, any> {
  state: any = {
    selected: false,
  };

  componentDidMount() {
    if (this.props.value === this.props.selectedValue) {
      this.setState({ selected: true });
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.value === newProps.selectedValue) {
      this.setState({ selected: true });
    } else {
      this.setState({ selected: false });
    }
  }

  localClick = () => {
    this.props.handleClick(this.props.value, this.props.children);
  }

  render() {
    return (
      <SelectItemStyle selected={this.state.selected} onClick={this.localClick}><P>{this.props.children}</P></SelectItemStyle>
    );
  }
}

export class Select extends Component<SelectProps, any> {
  value: string;
  node: HTMLDivElement;

  state: any = {
    selected: '',
    isOpen: false,
  };

  get selectedValue() {
    return this.value;
  }

  componentWillMount() {
    React.Children.forEach(this.props.children, (child) => {
      if (typeof this.props.selected !== 'undefined' && this.props.selected === child.props.value) {
        this.value = child.props.value;
        this.state.selected = child.props.children;
      }
    });
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, true);
  }

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { onPressEnter, onKeyDown } = this.props;
    if (event.keyCode === 13 && onPressEnter) {
      onPressEnter(event);
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  }

  handleChange = (value: string, label: string) => {
    this.value = value;

    this.setState({
      selected: label,
    });

    this.props.onChange(value, this.props.model);

    this.handleToggle(false);
  }

  handleToggle = (force?: boolean) => {
    this.setState({
      isOpen: force || !this.state.isOpen,
    }, () => {
      if (this.state.isOpen) {
        document.addEventListener('mousedown', this.handleClick, true);
      } else {
        document.removeEventListener('mousedown', this.handleClick, true);
      }
    });
  }

  handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (this.node === null || this.node.contains(event.target)) return;

    this.handleToggle(false);
  }

  render() {
    const { width } = this.props;
    const { isOpen } = this.state;

    return (
      <Wrapper width={width}>
        <div ref={(node: HTMLDivElement) => this.node = node}>
          <Input tabIndex={0} onClick={() => this.handleToggle(!this.state.isOpen)}>
            <P>{this.state.selected}</P>
            <Icon name='exit2' className={(isOpen ? 'open' : 'closed')} />
          </Input>
          <TransitionGroup>
            {this.state.isOpen &&
              <SelectStyle>
                {React.Children.map(this.props.children, child => (
                  React.cloneElement(child, { handleClick: this.handleChange, selectedValue: this.selectedValue})
                ))}
              </SelectStyle>
            }
          </TransitionGroup>
        </div>
      </Wrapper>
    );
  }
}
