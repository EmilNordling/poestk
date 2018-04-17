import React, { Component } from 'react'
import styled from 'styled-components'
import { computed } from 'mobx'
import { observer, inject } from 'mobx-react'
import { colors } from '../constants'
import { Dropdown } from '../common'
import Emitter from '../../../pst/src/core/Emitter'
import { reset, decodeTree, changeClass, redraw } from '../../../pst/src/core/publicAPI'

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

  ${props => props.open && `
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

@inject('guiState')
@inject('allocationStore')
@observer
class CharacterInfo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hash: '',
    }

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
    return this.props.guiState.characterInfoOpen
  }

  allocated(node) {
    node.sd.forEach((stat) => {
      const Precent = stat.match(/%/g) || null
      const Value = parseFloat(/\d*\.?\d/gi.exec(stat)[0].replace(/\s/g, ''))
      const Description = /\S+[a-z].*/gi.exec(stat)[0]
      const key = (Description).replace(/\s/g, '')

      if (key in this.stats) {
        this.stats[key].value += Value
      } else {
        this.stats[key] = {
          value: Value,
          type: Precent,
          description: Description,
          id: key,
        }
      }
    })

    this.forceUpdate()
  }

  deallocated(node) {
    node.sd.forEach((stat) => {
      const value = parseFloat(/\d*\.?\d/gi.exec(stat)[0].replace(/\s/g, ''))
      const Description = /\S+[a-z].*/gi.exec(stat)[0]
      const key = (Description).replace(/\s/g, '')

      this.stats[key].value -= value

      if (this.stats[key].value <= 0) {
        delete this.stats[key]
      }
    })

    this.forceUpdate()
  }


  render() {
    const stats = Object.keys(this.stats).map(x => (
      <Item key={this.stats[x].id}>
        {this.stats[x].value }{this.stats[x].type} { this.stats[x].description }
      </Item>
    ))

    // temp
    const classes = ['scion', 1, 2, 3, 4, 5, 6]

    return (
      <Info open={this.menuState}>
        <Header>
          <BtnWrapper>
            <Btn onClick={() => reset()}>reset</Btn>
            <Btn onClick={() => redraw()}>redraw</Btn>
          </BtnWrapper>
          <BtnWrapper>
            <input onChange={event => this.setState({ hash: event.target.value })} />
            <Btn onClick={() => decodeTree(this.state.hash)}>decode</Btn>
          </BtnWrapper>
          <BtnWrapper>
            <select onChange={event => changeClass(parseInt(event.target.value, 10), true, true)}>
              {
                classes.map((x, i) => (<option key={x} value={i}>{x}</option>))
              }
            </select>
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
