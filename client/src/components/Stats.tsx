import React, { Component } from 'react';
import styled from 'styled-components';
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
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
  background: ${colors.main_content_dark};
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
  border-bottom: 2px solid ${colors.main_sep};

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

const StatsDisplay: React.SFC<{ name: string, display: number | null }> = (props) => {
  if (props.display === null) return null;

  return (
    <StatsDisplayStyle>
      <Description>
        <P align='right'>{props.name}:</P>
      </Description>
      <Value>
        <P align='left'>{props.display}</P>
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

  return (
    <Container>
      <Header>
        <Nav />
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
        <StatsItem>
          <StatsDisplay name='Strength' display={activeBuild.stats.strength.display} />
          <StatsDisplay name='Dexterity' display={activeBuild.stats.dexterity.display} />
          <StatsDisplay name='Intelligence' display={activeBuild.stats.intelligence.display} />
        </StatsItem>

        <StatsItem>
          <StatsDisplay name='Total Life' display={activeBuild.stats.life.display} />
          <StatsDisplay name='%Inc Life' display={activeBuild.stats.life.increased} />
        </StatsItem>
        <StatsItem>
          <StatsDisplay name='Total Mana' display={activeBuild.stats.mana.display} />
          <StatsDisplay name='%Inc Mana' display={activeBuild.stats.mana.increased} />
        </StatsItem>
        <StatsItem>
          <StatsDisplay name='Total Energy Shield' display={activeBuild.stats.energyShield.display} />
          <StatsDisplay name='%Inc Energy Shield' display={activeBuild.stats.energyShield.increased} />
        </StatsItem>
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
