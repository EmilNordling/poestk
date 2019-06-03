import React from 'react';
import styled, { css } from 'styled-components';

export interface ParagraphProps {
	margin?: true | number;
	align?: 'center' | 'left' | 'right';
	weight?: 300 | 400 | 500 | 700 | 800;
	color?: string;
	italic?: boolean;
}

const ParagraphStyle = styled.div<ParagraphProps>`
  color: inherit;
  font-size: 1rem;
  font-weight: ${props => props.weight ? props.weight : 'normal'};
	white-space: pre-wrap;
	word-wrap: break-word;

  ${({ margin }) => margin && css`
    margin-bottom: ${margin === true ? '20px' : `${margin}px`}};
  `};
  ${({ align }) => align && css`
    text-align: ${align};
  `};
  ${({ color }) => color && css`
    color: ${color};
  `};
  ${({ italic }) => italic && css`
    font-style: italic;
  `};
`;

const Paragraph: React.SFC<ParagraphProps> = ({ children, ...rest }) => (
	<ParagraphStyle {...rest}>{children}</ParagraphStyle>
);

export default Paragraph;
