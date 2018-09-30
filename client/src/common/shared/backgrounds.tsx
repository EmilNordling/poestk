import styled from 'styled-components';
import { colors } from '../../constants';

export const Gradient = styled.div`
  display: flex;
  flex: 1;
  padding: 0 10px;
  background: ${colors.mainDarken};
  background-image: linear-gradient(90deg, ${colors.bgGradientStart} 20%, ${colors.bgGradientEnd});
`;

export const SplashBackground = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background: repeat 108% 103% url(/assets/splash.png);
  background-position: center;
`;
