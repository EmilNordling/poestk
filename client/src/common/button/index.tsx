import React from 'react';
import styled, { css } from 'styled-components';
import Icon from '../icon/index';
import ThemeHolder, { withCSSVar } from '../../utils/ThemeHolder';

type ButtonColor = 'primary' | 'ghost' | 'accent' | 'danger' | 'warning' | 'info' | 'success';
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonVariant = 'contained' | 'outlined' | 'text' | 'floating' | 'icon';

export interface ButtonProps {
  icon?: string;
  type?: ButtonVariant;
  size?: ButtonSize;
  onClick?: React.FormEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
  margin?: boolean;
}

const ButtonBase = styled.button`
  position: relative;
  display: inline-block;
  min-width: 64px;
  min-height: 36px;
  padding: 8px 16px;
  margin: ${(props: ButtonProps) => props.margin && '8px'};
  border: none;
  vertical-align: top;
  outline: none;
  border-radius: 4px;
  font-family: ${withCSSVar(ThemeHolder.current.fontFamily)};
  font-size: 1.6rem;
  line-height: 1.5;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  letter-spacing: 0.02857rem;
  color: #ffffff;
  transition: background-color 200ms ease, color 200ms ease;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.3);
  text-transform: capitalize;

  ${(props: ButtonProps) => !props.disabled ? css`
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: 0;
      transition: opacity 200ms ease;
      border-radius: 4px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
    }

    &:active::before {
      opacity: 1;
    }
  ` : css`
    background-color: rgba(0, 0, 0, 0.15);
    color: rgba(0, 0, 0, 0.25);
    box-shadow: none;
  `};
`;

const ContainedStyle = styled(ButtonBase)`

  ${(props: ButtonProps) => !props.disabled && css`
    background-color: #847aff;

    &:hover {
      background-color: #685cff;
    }
  `}
`;

const TextStyle = styled(ButtonBase)`
  background-color: #847aff;

  &:hover {
    background-color: #685cff;
  }
`;

class Button extends React.Component<ButtonProps, any> {
  static defaultProps: Partial<ButtonProps> = {
    size: 'medium',
    type: 'contained',
    disabled: false,
    loading: false,
    margin: false,
  };

  constructor(props: ButtonProps) {
    super(props);

    this.state = {
      disabled: props.disabled,
      loading: props.loading,
    };
  }

  private handleClick = (event: React.FormEvent<HTMLButtonElement>) => {
    const { onClick, disabled } = this.props;

    if (typeof onClick !== 'undefined' && !disabled) {
      onClick(event);
    }
  }

  render() {
    const { type, size, icon, disabled, margin, loading, children } = this.props;

    const iconName = loading ? 'loading' : icon;
    const iconNode = iconName ? <Icon name={iconName} /> : null;

    const renderButton = () => {
      switch (type) {
        case 'outlined':
          break;
        case 'text':
          break;
        case 'icon':
          break;
        case 'floating':
          break;
        default:
          return (
            <ContainedStyle onClick={this.handleClick} margin={margin} disabled={disabled}>
              {iconNode}{children}
            </ContainedStyle>
          );
      }
    };

    return renderButton();
  }
}

export default Button;
