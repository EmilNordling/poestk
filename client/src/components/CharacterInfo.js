import React, { Component } from 'react'
import styled from 'styled-components'
import { computed } from 'mobx'
import { observer, inject } from 'mobx-react'
import { colors, media } from '../constants'
import Emitter from '../../../pst/src/corev2/Emitter'

const Info = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  transform: translateX(100%);
  width: 300px;
  font-size: 1.3rem;
  transition: transform 200ms ease;
  will-change: transform;
  background-color: ${colors.gray400};
  border-left: 2px solid ${colors.gray300};

  ${media.large`
    position: static;
    display: flex;
    flex-direction: column;
  `}

  ${props => props.open && `
    transform: none;
  `}
`

const Header = styled.header`
  height: 100px;
  border-bottom: 1px solid ${colors.gray300};
`

const Content = styled.div`
  flex: 1;
`

const Item = styled.div`
  padding: 0px 10px 5px;
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
  font-size: 1.5em;
  border-bottom: 1px solid ${colors.gray300};
`

const GroupFooter = styled.div`
  margin: 10px;
`

@inject('guiState')
@inject('allocationStore')
@observer
export default class CharacterInfo extends Component {
  constructor(props) {
    super(props)

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
      const Value = parseInt(/\d+/gi.exec(stat)[0].replace(/\s/g, ''), 10)
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
      const value = parseInt(/\d+/gi.exec(stat)[0].replace(/\s/g, ''), 10)
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
      <Item key={this.stats[x].id}>{
        this.stats[x].value }{this.stats[x].type} { this.stats[x].description }
      </Item>
    ))

    return (
      <Info open={this.menuState}>
        <Header />
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
