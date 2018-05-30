import React, { Component } from 'react'
import styled from 'styled-components'
import { colors } from '../constants'
import { computed } from 'mobx'
import { observer, inject } from 'mobx-react'

const Container = styled.div`
  align-content: space-around;
  align-items: center;
  box-sizing: border-box;
  contain: content;
  flex-direction: column;
  justify-content: center;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  min-height: 340px;
  padding: 60px 0;
  position: fixed;
  z-index: 3;
  display: flex;
`

const InnerWrapper = styled.div`
  display: flex;
  contain: layout;
  flex-direction: column;
`

const Inner = styled.div`
  max-height: 800px;
  width: 490px;
  background: red;
  display: flex;
  flex: 1;
  flex-direction: column;
  contain: layout;
  word-wrap: break-word;
`

const Header = styled.div`
  height: 20px;
`

const ScrollableWrap = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  min-height: 1px;
`

const Scroll = styled.div`
  padding-bottom: 20px;
  contain: layout;
  flex: 1;
  min-height: 1px;
  overflow-y: scroll;
`

@inject('guiStore')
@observer
class Modal extends Component {
  render() {
    return (
      <Container>
        <InnerWrapper>
          <Inner>
            <Header />
              <ScrollableWrap>
                <Scroll>
                  qweqwe
                </Scroll>
              </ScrollableWrap>
            <Header />
          </Inner>
        </InnerWrapper>
      </Container>
    )
  }
}

export default Modal
