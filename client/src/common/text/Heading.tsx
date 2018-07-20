import React from 'react';
import styled, { css } from 'styled-components';

const sizes = [
  3.2,
  2.8,
  2.1,
];

interface HeadingProps {
  size: 1 | 2 | 3;
  margin?: true | number;
}

const HeadingStyle = styled.div`
  color: inherit;
  font-size: ${(props: HeadingProps) => sizes[props.size - 1]}rem;
  text-align: center;
  font-weight: 300;

  ${(props: HeadingProps) => props.margin && css`
    margin-bottom: ${props.margin === true ? '20px' : props.margin + 'px'}};
  `};
`;

const Heading: React.SFC<HeadingProps> = ({ children, ...rest }) => (
  <HeadingStyle {...rest}>{children}</HeadingStyle>
);

export default Heading;
