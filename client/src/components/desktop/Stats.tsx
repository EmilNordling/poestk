import React, { Component } from 'react';
import styled from 'styled-components';
import { computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import { colors } from '../../constants';
import Allocated from '../Allocated';
import { Select, Options } from '../../common/select';
import { Col, Row } from '../../common/grid';
import { changeClass, redraw } from '../../../../pst/src/core/publicAPI';
import Icon from '../../common/icon';
import Nav from '../Nav';
import { v4 } from 'uuid';
import { Label } from '../../common/text';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100%;
  z-index: 1;
  background: ${colors.main_content};
  box-shadow: 1px 0 3px rgba(0, 0, 0, 0.2);
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  height: 30px;
  width: 100%;
  padding: 0 10px;
  background: ${colors.main_content_dark};
`

const Content = styled.header`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const Footer = styled.footer`
  width: 100%;
  height: 18px;
  background: ${colors.main_content_dark};
`

const Left = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 10px;
`

const StatsItem = styled.div`
  padding: 10px;
  border-bottom: 2px solid ${colors.main_sep};

  &:last-of-type {
    border-bottom: none;
  }
`

const TempItem = styled.div`
  width: 20px;
  height: 20px;
  background: red;
`

@inject('guiStore', 'commonStore', 'buildsStore')
@observer
class DesktopStats extends Component {
  allocation: React.RefObject<any> = React.createRef();

  change = (value: string, model: string) => {
    switch (model) {
      case 'selectedClass':
        changeClass(parseInt(value, 10), true, true);
        break;
      case 'selectedAscendancy':
        console.log(value);
        break;
      case 'bandit':
        console.log(value);
        break;
    }
  }

  saveBuildShouldNotBeHere = () => {
    const model = {
      slug: v4(),
      name: 'hm',
      character: 'hm',
      passives: 'hm',
      items: 'hm',
      bandits: 'hm',
    }

    this.props.buildsStore.createBuild(model);
  }

  render() {
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
                <Select selected='0' onChange={this.change} model='selectedClass'>
                  <Options value='0'>Scion</Options>
                  <Options value='1'>Marauder</Options>
                  <Options value='2'>Ranger</Options>
                  <Options value='3'>Witch</Options>
                  <Options value='4'>Duelist</Options>
                  <Options value='5'>Templar</Options>
                  <Options value='6'>Shadow</Options>
                </Select>
              </Col>
              <Col span={2}>
                <Select selected='0' onChange={this.change} model='selectedAscendancy'>
                  <Options value='0'>dummy 1</Options>
                  <Options value='1'>dummy 2</Options>
                  <Options value='2'>dummy 3</Options>
                </Select>
              </Col>
            </Row>
          </StatsItem>
          <StatsItem>
            <Label>Bandits</Label>
            <Row gutter={12}>
              <Col span={0}>
                <Select selected='3' onChange={this.change} model='bandit'>
                  <Options value='0'>Kraityn</Options>
                  <Options value='1'>Alira</Options>
                  <Options value='2'>Oak</Options>
                  <Options value='3'>Kill All Three</Options>
                </Select>
              </Col>
            </Row>
          </StatsItem>
          <StatsItem>
            <Allocated ref={this.allocation} />
          </StatsItem>
        </Content>
        <Footer>
          <Left>
          </Left>
        </Footer>
      </Container>
    )
  }
}

export default DesktopStats
