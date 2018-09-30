import React, { Component, Fragment } from 'react';
import styled, { css } from 'styled-components';
import { colors } from '../constants';
import ThemeHolder from '../utils/ThemeHolder';
import { observer, inject } from 'mobx-react';
import withTheme from '../hoc/withTheme';
import Icon from '../common/icon/index';
import { P } from '../common/text/index';
import { BuildStore } from '../stores/index';
import { characters } from '../classes/pst/index';

interface CardStyleProps {
  border: boolean;
}

const TabsStyle = withTheme(styled.div`
  position: relative;
  display: flex;
  height: 30px;
  box-sizing: content-box;
  border-bottom: 1px solid ${colors.borderStrong};
  z-index: 2;
  background: ${colors.mainDarken};
`);

const Shadow = styled.div`
  position: absolute;
  top: calc(100% + 1px);
  height: 10px;
  width: 100%;
  pointer-events: none;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -5px;
    width: 100%;
    height: 5px;
    pointer-events: none;
    box-shadow: 0 2px 4px 0 black;
  }
`;

const Tab = (props) => (
  <TabStyle {...props}>
    <P>{props.children}</P>
  </TabStyle>
);

const TabStyle = withTheme(styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100px;
  border-right: 1px solid ${colors.borderLight};

  ${(props) => props.active && css`
    background: #121315;
    color: white;
  `};
`);

@inject('buildStore')
@observer
class Tabs extends Component<{ buildStore: BuildStore }> {
  render() {
    const { loading, activeBuild } = this.props.buildStore;

    if (loading) return <TabsStyle />;

    return (
      <TabsStyle>
        <Shadow />
        <Tab active={true}>{characters[activeBuild.classID].name}</Tab>
      </TabsStyle>
    );
  }
}

export default Tabs;
