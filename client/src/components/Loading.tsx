import React from 'react';
import styled from 'styled-components';
import { colors } from '../constants';
import Loadable from 'react-loadable';

const Background = styled.div`
  display: flex;
  flex: 1;
  padding: 0 10px;
  background: ${colors.main_content_dark};
  background-image: linear-gradient(90deg, #1b1d23 20%, #282b35);
`;

const Loading: React.SFC<Loadable.LoadingComponentProps> = () => <Background />;

export default Loading;
