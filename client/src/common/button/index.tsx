import React from 'react';
import styled from 'styled-components';
import { colors, media } from '../../constants';
import Icon from '../icon';
import ThemeHolder, { withCSSVar } from '../../utils/ThemeHolder';

type ButtonType = 'primary' | 'ghost' | 'accent' | 'danger' | 'warning' | 'info' | 'success';
type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  icon?: string;
  type?: ButtonType;
  size?: ButtonSize;
  onClick?: React.FormEventHandler<any>;
  disabled?: boolean;
  loading?: boolean;
}

const ButtonStyle = styled.button`
  display: inline-block;
  padding: 8px 14px 9px;
  border: 1px solid #1d1f24;
  vertical-align: top;
  outline: none;
  border-radius: 4px;
  font-family: ${withCSSVar(ThemeHolder.current.fontFamily)};
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1em;
  text-align: center;
  text-decoration: none;
  color: #ffffff;
  background-color: #847aff;
  background-image: linear-gradient(90deg, rgba(219, 86, 255, 0.62) -20%, rgba(108, 96, 255, 0.52));
  transition: background-color 0.2s ease, color 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: #3f3b7b;
    color: #dcdcdc;
  }
`;

class Button extends React.Component<ButtonProps, any> {
  componentWillReceiveProps() {

  }

  render() {
    const { type, size, icon, disabled, loading, children, ...rest } = this.props;

    const iconName = loading ? 'loading' : icon;
    const iconNode = iconName ? <Icon name={iconName} /> : null;

    return (
      <ButtonStyle {...rest}>
        {iconNode}{children}
      </ButtonStyle>
    );
  }
}

export default Button;
