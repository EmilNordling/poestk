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
import withTheme from '../hoc/withTheme';
import StatsDisplay, { StatsGroup } from './StatsDisplay';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  height: 30px;
  width: 100%;
  padding: 0 10px;
  background: ${colors.mainDarken};
`;

const Container = withTheme(styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  height: 100%;
  z-index: 1;
  background: ${colors.main};
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.15);
  box-shadow: 0 0 20px 8px ${colors.bg};

  ${() => ThemeHolder.useBorders && css`
    border-right: 1px solid ${colors.borderStrong};
  `};
`);

const Section = withTheme(styled.div`
  flex-shrink: 0;
  padding: 10px;

  ${() => ThemeHolder.useBorders && css`
    border-top: 1px solid ${colors.borderStrong};

    &:last-of-type {
      border-bottom: 1px solid ${colors.borderStrong};
    }
  `};

  ${(props: any) => props.scrollable && css`
    max-height: 600px;
    overflow-x: auto;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      height: 56px;
      background: ${colors.borderStrong};
    }
  `};
`);

const Stats: React.SFC<{ buildStore?: BuildStore }> = (props) => {
  const { loading, activeBuild, change } = props.buildStore!;

  if (loading) return <Container />;

  const chars = Object.keys(characters).map(char => (
    <Options key={char} value={char}>{characters[char].name}</Options>
  ));

  const ascendancies = Object.keys(characters[activeBuild.classID].classes).map(asc => (
    <Options key={asc} value={asc}>{characters[activeBuild.classID].classes[asc].name}</Options>
  ));

  return (
    <Container>
      <Header />
      <Section>
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
      </Section>
      <Section scrollable={true}>
        {console.log(activeBuild.stats)}
        <StatsGroup>
          <StatsDisplay name='Strength'>{activeBuild.stats.strength.display}</StatsDisplay>
          <StatsDisplay name='Dexterity'>{activeBuild.stats.dexterity.display}</StatsDisplay>
          <StatsDisplay name='Intelligence'>{activeBuild.stats.intelligence.display}</StatsDisplay>
        </StatsGroup>

        <StatsGroup>
          <StatsDisplay name='Total Life'>{activeBuild.stats.life.display}</StatsDisplay>
          <StatsDisplay name='%Inc Life'>{activeBuild.stats.life.increased}%</StatsDisplay>
        </StatsGroup>

        <StatsGroup>
          <StatsDisplay name='Total Mana'>{activeBuild.stats.mana.display}</StatsDisplay>
          <StatsDisplay name='%Inc Mana'>{activeBuild.stats.mana.increased}%</StatsDisplay>
        </StatsGroup>

        <StatsGroup>
          <StatsDisplay name='Total Energy Shield'>{activeBuild.stats.energyShield.display}</StatsDisplay>
          <StatsDisplay name='%Inc Energy Shield'>{activeBuild.stats.energyShield.increased}%</StatsDisplay>
        </StatsGroup>

        <StatsGroup>
          <StatsDisplay name='Total Evasion Rating'>{activeBuild.stats.evasion.display}</StatsDisplay>
          <StatsDisplay name='%Inc Evasion Rating'>{activeBuild.stats.evasion.increased}%</StatsDisplay>
        </StatsGroup>

        <StatsGroup>
          <StatsDisplay name='Total Armour'>{activeBuild.stats.armour.display}</StatsDisplay>
          <StatsDisplay name='%Inc Armour'>{activeBuild.stats.armour.increased}%</StatsDisplay>
        </StatsGroup>
      </Section>
    </Container>
  );
};

export default inject('buildStore')(observer(Stats));
