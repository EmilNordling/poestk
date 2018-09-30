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

const TabStyle = withTheme(styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100px;
  border-right: 1px solid ${colors.borderLight};

  ${(props) => props.active && css`
    background: #121315;
    color: white;
  `};

  &:hover {
    & .tabIcon {
      opacity: 1;
    }
  }
`);

const TabIcons = styled.div`
  position: absolute;
  right: 6px;
  display: flex;
  font-size: 0.8rem;
`;

const TabIcon = styled.div`
  position: absolute;
  right: 6px;
  display: flex;
  cursor: pointer;
  font-size: 0.8rem;
  opacity: 0;
`;

const Tab = (props) => {
  const { active, italic } = props;

  return (
    <TabStyle active={active}>
      <P italic={italic}>{props.children}</P>
      <TabIcon className='tabIcon'><Icon name='exitThick' /></TabIcon>
    </TabStyle>
  );
};


@inject('buildStore')
@observer
class Tabs extends Component<{ buildStore?: BuildStore }> {
  render() {
    const { loading, activeBuild } = this.props.buildStore!;

    if (loading) return <TabsStyle />;

    return (
      <TabsStyle>
        <Shadow />
        <Tab active={true} italic={!activeBuild.isUploaded}>{activeBuild.name}</Tab>
      </TabsStyle>
    );
  }
}

export default Tabs;
