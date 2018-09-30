import React, { Component, Fragment } from 'react';
import styled, { css } from 'styled-components';
import { colors } from '../constants';
import ThemeHolder from '../utils/ThemeHolder';
import { observer } from 'mobx-react';
import withTheme from '../hoc/withTheme';
import Icon from '../common/icon/index';

const TabbarStyle = withTheme(styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 40px;
  padding: 10px 0;
  border-right: 1px solid ${() => ThemeHolder.useBorders ? colors.borderStrong : colors.borderLight};
  z-index: 2;
  background: ${colors.mainDarkenAlt};
  text-align: center;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
`);

const TopGroup = styled.div`
  width: 100%;
  font-size: 15px;
`;

const IconWrapper = withTheme(styled.div`
  width: 100%;
  margin-bottom: 15px;
  cursor: pointer;

  &:hover {
    color: #ffffff;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`);

class Tabbar extends Component {
  render() {
    return (
      <TabbarStyle>
        <TopGroup>
          <IconWrapper><Icon name='warning' /></IconWrapper>
          <IconWrapper><Icon name='warning' /></IconWrapper>
          <IconWrapper><Icon name='warning' /></IconWrapper>
        </TopGroup>

        <TopGroup>
          <IconWrapper><Icon name='gearFilled' /></IconWrapper>
        </TopGroup>
      </TabbarStyle>
    );
  }
}

export default Tabbar;
