import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { colors, fontFamily } from '../../constants';
import Icon from '../icon';

export type SelectValue = string;

export interface SelectProps {
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

const SelectStyle = styled.div`
  position: absolute;
  width: 100%;
  padding: 0;
  margin-top: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  z-index: 1;
  border-radius: 4px;
  background: ${colors.main_backdrop};
  transition: all 0.2s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`

const SelectItemStyle = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0 10px 10px;
  color: ${colors.main_color};
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.15);
  }

  ${props => props.selected && css`
    background: rgba(0, 0, 0, 0.15);
  `}
`

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  user-select: none;
`;

const Input = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid ${colors.main_backdrop};
  background: ${colors.main_content_dark};
  border-radius: 4px;
  cursor: pointer;

  &:focus {
    outline: 0;
    background: ${colors.main_content_dark};
  }
`;

const IconWrapper = styled.div`
  width: 7px;
  height: 7px;
  background: red;
`;

export class Options extends Component<SelectOptionProps, any> {
  static propTypes = {
    value: PropTypes.string.isRequired,
  }

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
      <SelectItemStyle selected={this.state.selected} onClick={this.localClick}><p>{this.props.children}</p></SelectItemStyle>
    )
  }
}

export class Select extends Component<SelectProps, any> {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    model: PropTypes.string.isRequired,
  }

  value: string;
  node: HTMLDivElement;

  state: any = {
    selected: '',
    isOpen: false,
  }

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
    return (
      <Wrapper>
        <div ref={(node: HTMLDivElement) => this.node = node}>
          <Input tabIndex="0" onClick={() => this.handleToggle(!this.state.isOpen)}><p>{this.state.selected}</p><Icon name="arrowStroke" /></Input>
          {this.state.isOpen &&
            <SelectStyle>
              {React.Children.map(this.props.children, child => (
                React.cloneElement(child, { handleClick: this.handleChange, selectedValue: this.selectedValue})
              ))}
            </SelectStyle>
          }
        </div>
      </Wrapper>
    )
  }
}
