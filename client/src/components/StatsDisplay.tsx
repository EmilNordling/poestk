import React from 'react';
import styled from 'styled-components';
import { P } from '../common/text';
import { colors } from '../constants';

const StatsDisplayStyle = styled.div`
  display: flex;
`;

const Description = styled.div`
  flex: 1;
`;

const Value = styled.div`
  flex: 1;
  margin-left: 10px;
`;

export const StatsGroup = styled.div`
  margin-bottom: 10px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const StatsDisplay: React.SFC<{ name: string }> = (props) => (
  <StatsDisplayStyle>
    <Description>
      <P color='rgba(230, 230, 230, 0.55)' align='right'>{props.name}:</P>
    </Description>
    <Value>
      <P align='left'>{props.children}</P>
    </Value>
  </StatsDisplayStyle>
);

export default StatsDisplay;
