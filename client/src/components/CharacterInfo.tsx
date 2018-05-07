import React, { Component } from 'react'
import styled from 'styled-components'
import { computed } from 'mobx'
import { observer, inject } from 'mobx-react'
import { colors } from '../constants'
import Emitter from '../../../pst/src/core/Emitter'
import { reset, decodeTree, changeClass, redraw } from '../../../pst/src/core/publicAPI'
import { scheme } from '../../../mod'

const Info = styled.div`
  position: absolute;
  top: 0;
  left: -320px;
  height: 100%;
  width: 320px;
  z-index: 1;
  overflow: hidden;
  font-size: 1.3rem;
  transition: transform 300ms ease;
  will-change: transform;
  background-color: ${colors.gray400};
  color: #efefef;

  ${(props: any) => props.open && `
    transform: translateX(320px);
  `}
`

const Header = styled.header`
  border-bottom: 1px solid ${colors.gray300};
`

const Content = styled.div`
  flex: 1;
`

const Item = styled.div`
  padding: 0 10px 5px;
  font-weight: 600;

  &:hover {
    background: ${colors.gray200};
  }
`

const Group = styled.div`

`

const GroupHeader = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid ${colors.gray300};
  font-size: 1.5em;
`

const GroupFooter = styled.div`
  margin: 10px;
`

const Btn = styled.div`
  font-size: 1.5rem;
  padding: 5px 10px;
  border: 1px solid ${colors.gray200};
  border-radius: 4px;
  cursor: pointer;
`

const BtnWrapper = styled.div`
  padding: 20px 10px;
  margin-top: 5px;
  border-top: 1px solid ${colors.gray200};
  display: flex;
  justify-content: space-between;

  &:first-of-type {
    border-top: none;
  }
`

@inject('guiStore')
@inject('allocationStore')
@observer
class CharacterInfo extends Component {
  constructor(props) {
    super(props)

    this.state = { hash: '' }

    // TODO: make mobx store
    this.stats = {}
    this.onAllocate = this.allocated.bind(this)
    this.onDeallocate = this.deallocated.bind(this)
  }

  componentWillMount() {
    Emitter.on('allocated', this.onAllocate)
    Emitter.on('deallocated', this.onDeallocate)
  }

  componentWillUnmount() {
    Emitter.removeListener('allocated', this.onAllocate)
    Emitter.removeListener('deallocated', this.onDeallocate)
  }

  @computed get menuState() {
    return this.props.guiStore.characterInfoOpen
  }

  allocated(node) {
    Object.keys(node.sd).forEach((stat) => {
      if (stat in this.stats) {
        if (Array.isArray(this.stats[stat].value)) {
          this.stats[stat].value.forEach((x, i) => { x += node.sd[stat][i] })
        } else {
          this.stats[stat].value += node.sd[stat]
        }
      } else {
        this.stats[stat] = {
          value: node.sd[stat],
          id: stat,
        }
      }
    })

    this.forceUpdate()
  }

  deallocated(node) {
    Object.keys(node.sd).forEach((stat) => {
      if (Array.isArray(this.stats[stat].value)) {
        this.stats[stat].value.forEach((x, i) => { x -= node.sd[stat][i] })
      } else {
        this.stats[stat].value -= node.sd[stat]
      }

      if (this.stats[stat].value <= 0 || (typeof this.stats[stat].value[0] !== 'undefined' && this.stats[stat].value[0] !== 0)) {
        delete this.stats[stat]
      }
    })

    this.forceUpdate()
  }

  changeClass(changeTo, destructive, newFrame) {
    this.stats = {}

    changeClass(changeTo, destructive, newFrame)

    this.forceUpdate()
  }

  reset() {
    this.stats = {}

    reset()

    this.forceUpdate()
  }

  debug() {
    if (typeof window['debug'] === 'undefined') {
      window['debug'] = true;
      const debug = Document.getElementById('__debug');
      console.dir(debug)
    } else {
      window['debug'] = !window['debug'];
    }
  }

  render() {
    const stats = Object.keys(this.stats).map((x) => {
      let desc = scheme[x]
      const hashCount = desc.match(/#/g) || []

      if (hashCount.length > 1) {
        hashCount.forEach((value, i) => {
          desc = desc.replace('#', this.stats[x].value[i])
        })
      } else if (hashCount.length === 1) {
        desc = desc.replace('#', this.stats[x].value)
      }

      return (
        <Item key={this.stats[x].id}>
          { desc }
        </Item>
      )
    })

    // temp
    const classes = ['scion', 1, 2, 3, 4, 5, 6]

    return (
      <Info open={this.menuState}>
        <Header>
          <BtnWrapper>
            <Btn onClick={() => this.reset()}>reset</Btn>
            <Btn onClick={() => redraw()}>redraw</Btn>
          </BtnWrapper>
          <BtnWrapper>
            <input onChange={event => this.setState({ hash: event.target.value })} />
            <Btn onClick={() => decodeTree(this.state.hash)}>decode</Btn>
          </BtnWrapper>
          <BtnWrapper>
            <select onChange={event => this.changeClass(parseInt(event.target.value, 10), true, true)}>
              {
                classes.map((x, i) => (<option key={x} value={i}>{x}</option>))
              }
            </select>
          </BtnWrapper>
          <BtnWrapper>
            <Btn onChange={() => this.debug()}>debug</Btn>
          </BtnWrapper>
        </Header>
        <Content>
          <Group>
            <GroupHeader>Stats</GroupHeader>
            { stats }
            <GroupFooter />
          </Group>
        </Content>
      </Info>
    )
  }
}

export default CharacterInfo
