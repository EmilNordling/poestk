import React, { SVGAttributes } from 'react';
import styled from 'styled-components';
import inject from '../../utils/dangerouslyInjectHTML';
import { iconMap, CSSVar } from '../../constants';

interface IconProps {
  name: string;
  className?: string;
}

const Svg = styled.svg`
  display: inline-block;
  width: ${CSSVar.iconBaseSize};
  height: ${CSSVar.iconBaseSize};
  vertical-align: text-top;
  fill: currentColor;
  stroke: currentColor;
  pointer-events: none;
`;

const Icon: React.SFC<IconProps> = ({ name, ...rest }) => (
  <Svg xmlns='http://www.w3.org/2000/svg' viewBox={iconMap[name].viewBox} {...rest} dangerouslySetInnerHTML={inject(iconMap[name].innerHTML)} />
);

export {
  iconMap,
};

export default Icon;
