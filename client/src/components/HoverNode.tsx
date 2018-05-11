import React, { Component } from 'react';
import styled from 'styled-components';
import { computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import { TransitionGroup } from 'react-transition-group';
import transition from 'styled-transition-group';
import { colors } from '../constants';
import Emitter from '../../../pst/src/core/Emitter';
import { scheme } from '../../../mod';
import setStyle from '../utils/attrStyleUpdate'

const duration = 100;

const Inner = transition.div.attrs({
  unmountOnExit: true,
  timeout: duration,
})`
  ${(props: any) => `
      top: ${props.position.y + 10}px;
      left: ${props.position.x + 10}px;
    `
  }
  padding: 5px 10px;
  position: absolute;
  border-radius: 4px;
  background: ${colors.gray250};
  transition: opacity ${duration}ms ease;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  pointer-events: none;

  & h3 {
    margin-bottom: 15px;

    &:only-child {
      margin-bottom: 0;
    }
  }

  & p {
    margin-bottom: 5px;
  }

  &:enter {
    opacity: 0.01;
  }
  &:enter-active {
    opacity: 1;
  }
  &:exit {
    opacity: 1;
  }
  &:exit-active {
    opacity: 0.01;
  }
`

@inject('guiStore')
@observer
class HoverNode extends Component {
  props: { guiStore?: GUI | any };
  node: HTMLElement;
  currentPosition: { x: number, y: number };
  text: { title: string, mods: Array<string> } = { title: '', mods: [] }

  set hoverState(value: boolean) {
    this.props.guiStore.isHovering = value;
  }

  @computed get hoverState() {
    return this.props.guiStore.isHovering;
  }

  constructor(props: any) {
    super(props)

    this.onHoverOver = this.hover.bind(this);
    this.onHoverOut = this.hoverOut.bind(this);
  }

  componentWillMount() {
    Emitter.on('hoverOver', this.onHoverOver)
    Emitter.on('hoverOut', this.onHoverOut)
  }

  componentWillUnmount() {
    Emitter.removeListener('hoverOver', this.onHoverOver)
    Emitter.removeListener('hoverOut', this.onHoverOut)
  }

  hover(position: { x: number, y: number }, node: any) {
    this.text.title = node.dn;
    this.text.mods = [];

    if (typeof node.sd !== 'undefined') {
      Object.keys(node.sd).forEach((mod) => {
        let desc = scheme[mod];
        const hashCount = desc.match(/#/g) || [];

        if (hashCount.length > 1) {
          hashCount.forEach((value: string, index: number) => {
            desc = desc.replace('#', node.sd[mod][index]);
          });
        } else if (hashCount.length === 1) {
          desc = desc.replace('#', node.sd[mod]);
        }

        this.text.mods.push(desc);
      });
    }

    this.currentPosition = position;
    this.hoverState = true;

    setStyle(`
      body {
        cursor: pointer;
      }
    `);
  }

  hoverOut(node: any) {
    this.hoverState = false;

    setStyle(`
      body {
        cursor: unset;
      }
    `);
  }

  render() {
    return (
      <TransitionGroup>
        {this.hoverState &&
          <Inner position={this.currentPosition} innerRef={(node: HTMLElement) => { this.node = node }}>
            <h3>{this.text.title}</h3>
            {
              this.text.mods.map((mod, index) => (
                <p key={index}>{mod}</p>
              ))
            }
          </Inner>
        }
      </TransitionGroup>
    )
  }
}

export default HoverNode
