import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { observer, inject } from 'mobx-react';
import { colors } from '../constants';
import { Select, Options } from '../common/select';
import { Col, Row } from '../common/grid';
import { Label, P } from '../common/text';
import { characters } from '../classes/pst';
import { BuildStore } from '../stores';
import Inventory from './Inventory';
import CharStats from './CharStats';
import Nav from './Nav';
import Tooltip from '../common/tooltip';
import ThemeHolder, { withCSSVar } from '../utils/ThemeHolder';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  height: 100%;
  z-index: 1;
  background: ${colors.main};
  box-shadow: 1px 0 3px rgba(0, 0, 0, 0.2);

  ${(props) => props.useBorder && css`
    border-right: 1px solid ${colors.borderStrong};
  `};
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  height: 30px;
  width: 100%;
  padding: 0 10px;
  background: ${colors.mainDarken};
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 18px;
  padding-right: 10px;
  z-index: 1;
  background: ${colors.mainDarken};
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);

  & p {
    margin-bottom: 2px;
    font-size: 1rem;
  }
`;

const Left = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 10px;
`;

const StatsItem = styled.div`
  padding: 10px;

  &:last-of-type {
    border-bottom: none;
  }
`;

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

const StatsDisplay: React.SFC<{ name: string }> = (props) => {
  return (
    <StatsDisplayStyle>
      <Description>
        <P align='right'>{props.name}:</P>
      </Description>
      <Value>
        <P align='left'>{props.children}</P>
      </Value>
    </StatsDisplayStyle>
  );
};

const Stats: React.SFC<{ buildStore?: BuildStore }> = (props) => {
  const { loading, activeBuild, change } = props.buildStore!;

  if (loading) return <></>;

  const chars = Object.keys(characters).map(char => (
    <Options key={char} value={char}>{characters[char].name}</Options>
  ));

  const ascendancies = Object.keys(characters[activeBuild.classID].classes).map(asc => (
    <Options key={asc} value={asc}>{characters[activeBuild.classID].classes[asc].name}</Options>
  ));

  const { useBorders } = ThemeHolder;

  return (
    <Container useBorder={useBorders}>
      <Header>
        <Nav />
      </Header>
      <Content>
        <StatsItem>
          <Label>Character</Label>
          <Row gutter={12}>
            <Col span={12}>
              <Select selected={activeBuild.classID.toString()} onChange={change} model='selectedClass'>
                {chars}
              </Select>
            </Col>
            <Col span={12}>
              <Select selected='0' onChange={change} model='selectedAscendancy'>
                <Options value='0'>none</Options>
                {ascendancies}
              </Select>
            </Col>
          </Row>
        </StatsItem>
        <StatsItem>
          <StatsDisplay name='Strength'>{activeBuild.stats.strength.display}</StatsDisplay>
          <StatsDisplay name='Dexterity'>{activeBuild.stats.dexterity.display}</StatsDisplay>
          <StatsDisplay name='Intelligence'>{activeBuild.stats.intelligence.display}</StatsDisplay>
        </StatsItem>
        <StatsItem>
          <StatsDisplay name='Total Life'>{activeBuild.stats.life.display}</StatsDisplay>
          <StatsDisplay name='%Inc Life'>{activeBuild.stats.life.increased}%</StatsDisplay>
        </StatsItem>
        <StatsItem>
          <StatsDisplay name='Total Mana'>{activeBuild.stats.mana.display}</StatsDisplay>
          <StatsDisplay name='%Inc Mana'>{activeBuild.stats.mana.increased}%</StatsDisplay>
        </StatsItem>
        <StatsItem>
          <StatsDisplay name='Total Energy Shield'>{activeBuild.stats.energyShield.display}</StatsDisplay>
          <StatsDisplay name='%Inc Energy Shield'>{activeBuild.stats.energyShield.increased}%</StatsDisplay>
        </StatsItem>
        {/* <StatsItem>
          <Inventory />
        </StatsItem> */}
      </Content>
      <Footer>
        <div>
          <p>version: 0.5.0</p>
        </div>
      </Footer>
    </Container>
  );
};

export default inject('buildStore')(observer(Stats));
