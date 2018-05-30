import React, { Component } from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import Pst from '../../components/Pst'
import DesktopStats from '../../components/desktop/Stats'
import { GlobalContainer } from '../../components/Containers'
import { isMobile } from '../../utils/isMobile'

import Header from '../../components/desktop/Tabs';
import Footer from '../../components/desktop/Footer';
import TopBar from '../../components/mobile/TopBar';
import BottomBar from '../../components/mobile/BottomBar';

const Inner = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const Content = styled.div`
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

@observer
class Home extends Component {
  render() {
    return (
      <GlobalContainer>
        { isMobile && <TopBar /> }
        { isMobile && <BottomBar /> }
        {!isMobile &&
          <DesktopStats />
        }

        <Inner>
          { !isMobile && <Header /> }

          <GlobalContainer>
            <Content>
              <Pst />
            </Content>
          </GlobalContainer>

          { !isMobile && <Footer /> }
        </Inner>

      </GlobalContainer>
    )
  }
}

export default Home;
