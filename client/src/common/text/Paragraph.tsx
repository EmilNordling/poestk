import React from 'react';
import styled, { css } from 'styled-components';

interface ParagraphProps {
  margin?: true | number;
}

const ParagraphStyle = styled.div`
  color: inherit;
  font-size: 1.6rem;

  ${(props: ParagraphProps) => props.margin && css`
    margin-bottom: ${props.margin === true ? '20px' : props.margin + 'px'}};
  `};
`;

const Paragraph: React.SFC<ParagraphProps> = ({ children, ...rest }) => (
  <ParagraphStyle {...rest}>{children}</ParagraphStyle>
);

export default Paragraph;
