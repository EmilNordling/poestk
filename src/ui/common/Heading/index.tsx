import React from 'react';
import styled, { css } from 'styled-components';
import { HeadingComponent } from './types';

const sizes = [
	2,
	1.375,
];

const HeadingStyle = styled.div<HeadingComponent.Style>`
  color: ${props => props.color ? props.color : 'inherit'};
  font-weight: ${props => props.weight ? props.weight : 'normal'};
  font-size: ${props => sizes[props.size - 1]}rem;
  ${({ margin }) => margin && css`
    margin-bottom: ${margin === true ? '20px' : `${margin}px`}};
  `};
	${({ align }) => align && css`
    text-align: ${align};
  `};
`;

const Heading: React.SFC<HeadingComponent.Props> = ({ children, ...rest }) => (
	<HeadingStyle {...rest}>{children}</HeadingStyle>
);

export default Heading;
