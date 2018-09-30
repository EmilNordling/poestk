import React from 'react';
import styled, { css } from 'styled-components';

interface ParagraphProps {
  margin?: true | number;
  align?: 'center' | 'left' | 'right';
  weight?: 300 | 400 | 500 | 700 | 800;
  color?: string;
}

const ParagraphStyle = styled.div`
  color: inherit;
  font-size: 1.6rem;
  font-weight: ${(props: ParagraphProps) => props.weight ? props.weight : 'normal'};

  ${(props) => props.margin && css`
    margin-bottom: ${props.margin === true ? '20px' : props.margin + 'px'}};
  `};

  ${(props) => props.align && css`
    text-align: ${props.align};
  `};

  ${(props) => props.color && css`
    color: ${props.color};
  `};
`;

const Paragraph: React.SFC<ParagraphProps> = ({ children, ...rest }) => (
  <ParagraphStyle {...rest}>{children}</ParagraphStyle>
);

export default Paragraph;
