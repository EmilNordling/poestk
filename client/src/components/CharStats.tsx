import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { colors } from '../constants';
import { Col, Row } from '../common/grid';
import { Label } from '../common/text';
import { BuildStore } from '../stores';

const Container = styled.div`
  display: flex;
  width: 100%;
`;

// 847aff ae65ff
const globleSize = 85;

const Globe = styled.div`
  position: relative;
  width: ${globleSize}px;
  height: ${globleSize}px;
  border-radius: ${globleSize / 2}px;
  overflow: hidden;
  background: #${props => props.mana ? '776cff' : 'ff6565' };
`;

const Energy = styled.div`
  position: absolute;
`;

const Wrapper = styled.div`
  flex: 1;
`;

const CharStats: React.SFC<{ buildStore?: BuildStore }> = inject('buildStore')(observer((props) => {
  const { loading, activeBuild, change } = props.buildStore!;

  if (loading) return <></>;

  return (
    <Container>
      <Globe />
      <Wrapper />
      <Globe mana />
    </Container>
  );
}));

export default CharStats;
