import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { colors } from '../constants';
import { Select, Options } from '../common/select';
import { Col, Row } from '../common/grid';
import { Label } from '../common/text';
import { changeClass, redraw } from '../classes/pst/publicAPI';
import { characters } from '../classes/pst';
import { BuildStore } from '../stores';
import { values } from 'mobx';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100%;
  z-index: 1;
  background: ${colors.main_content};
  box-shadow: 1px 0 3px rgba(0, 0, 0, 0.2);
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  height: 30px;
  width: 100%;
  padding: 0 10px;
  background: ${colors.main_content_dark};
`;

const Content = styled.header`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Footer = styled.footer`
  width: 100%;
  height: 18px;
  background: ${colors.main_content_dark};
`;

const Left = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 10px;
`;

const StatsItem = styled.div`
  padding: 10px;
  border-bottom: 2px solid ${colors.main_sep};

  &:last-of-type {
    border-bottom: none;
  }
`;

const TempItem = styled.div`
  width: 20px;
  height: 20px;
  background: red;
`;

const Stats: React.SFC<{ buildStore?: BuildStore }> = inject('buildStore')(observer((props) => {
  const { loading, activeBuild, change } = props.buildStore!;

  if (loading) return <></>;

  const chars = Object.keys(characters).map(char => (
    <Options key={char} value={char}>{characters[char].name}</Options>
  ));

  const ascendancies = Object.keys(activeBuild.ascendancies).map(asc => (
    <Options key={asc} value={asc}>{activeBuild.ascendancies[asc].name}</Options>
  ));

  return (
    <Container>
      <Header>
        qwe
      </Header>
      <Content>
        <StatsItem>
          <Label>Character</Label>
          <Row gutter={12}>
            <Col span={2}>
              <Select selected={activeBuild.classID.toString()} onChange={change} model='selectedClass'>
                {chars}
              </Select>
            </Col>
            <Col span={2}>
              <Select selected='0' onChange={change} model='selectedAscendancy'>
                <Options value='0'>none</Options>
                {ascendancies}
              </Select>
            </Col>
          </Row>
        </StatsItem>
      </Content>
      <Footer>
        qwe
      </Footer>
    </Container>
  );
}));

export default Stats;
