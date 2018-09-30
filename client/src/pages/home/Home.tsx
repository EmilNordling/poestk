import React, { Component, Fragment } from 'react';
import Stats from '../../components/_Stats';
import Tabbar from '../../components/Tabbar';
import styled from 'styled-components';
import Pst from './Pst';
import HoverNode from './HoverNode';
import Tabs from '../../components/Tabs';

const Inner = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Container = styled.main`
  position: relative;
  display: flex;
  flex: 1;
`;

// TEMP
const Content = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Home = () => (
  <Fragment>
    <HoverNode />
    <Container>
      <Tabbar />
      <Stats />
      <Inner>
        <Tabs />
        <Content>
          <Pst />
        </Content>
      </Inner>
    </Container>
  </Fragment>
);

export default Home;
