import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { colors, media } from '../../constants';
import ThemeHolder from '../../utils/ThemeHolder';
import withTheme from '../../hoc/withTheme';

interface CardProps {
  width: number;
}

export const CardStyle = withTheme(styled.div`
  max-width: ${(props: CardProps) => props.width ? `${props.width.toString()}px` : '200%'};
  width: 100%;
  padding: 40px;
  background: ${colors.content};
  border-radius: ${() => ThemeHolder.useborderRadius ? '5px' : '0'};
  text-align: center;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);

  ${media.small`
    padding: 40px 20px;
  `}

  ${() => ThemeHolder.useBorders && css`
    border: 1px solid ${colors.borderStrong};
  `};
`);

class Card extends Component<CardProps> {
  render() {
    const { children, width } = this.props;

    return (
      <CardStyle width={width}>
        {children}
      </CardStyle>
    );
  }
}

export default Card;
