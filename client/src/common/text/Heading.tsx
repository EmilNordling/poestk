import React from 'react';
import styled, { css } from 'styled-components';

const sizes = [
  3.2,
  2.8,
  2.1,
];

interface HeadingProps {
  size: 1 | 2 | 3;
  margin?: boolean | number;
  weight?: 300 | 400 | 500 | 700 | 800;
  color?: string;
}

const HeadingStyle = styled.div`
  color: ${(props) => props.color ? props.color : 'inherit'};
  font-weight: ${(props) => props.weight ? props.weight : 300};
  font-size: ${(props: HeadingProps) => sizes[props.size - 1]}rem;

  ${(props: HeadingProps) => props.margin && css`
    margin-bottom: ${props.margin === true ? '20px' : props.margin + 'px'}};
  `};
`;

const Heading: React.SFC<HeadingProps> = ({ children, ...rest }) => (
  <HeadingStyle {...rest}>{children}</HeadingStyle>
);

export default Heading;
