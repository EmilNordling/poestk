import React, { Component, Fragment } from 'react';
import styled, { css } from 'styled-components';
import { computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import { TransitionGroup } from 'react-transition-group';
import transition from 'styled-transition-group';
import { colors } from '../../constants';
import Emitter from '../../classes/pstv2/Emitter';
import { scheme } from '../../../../mod';
import setStyle from '../../utils/attrStyleUpdate';
import GUIStore from '../../stores/GUIStore';
import { P } from '../../common/text';
import { Motion, spring } from 'react-motion';
import withTheme from '../../hoc/withTheme';
import ThemeHolder from '../../utils/ThemeHolder';
import { MatrixPoint } from '../../classes/pstv2/render/Scene';

const duration = 250;

const Inner = withTheme(transition.div.attrs({
  unmountOnExit: true,
  timeout: duration,
})`
  padding: 7px 10px;
  position: absolute;
  border-radius: ${() => ThemeHolder.useborderRadius ? '4px' : '0'};
  background: ${colors.mainDarken};
  transition: opacity ${duration}ms ease;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  transition: opacity 125ms, transform 125ms;
  pointer-events: none;
  z-index: 1;

  ${() => ThemeHolder.useBorders && css`
    border: 1px solid ${colors.borderLight};
  `};

  ${(props: any) => `
    top: ${props.position.y + 10}px;
    left: ${props.position.x + 10}px;
  `}

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
    opacity: 1;
    transform: scale(1);
  }
  &:enter-active {
    opacity: 1;
    transform: scale(1);
  }
  &:exit {
    opacity: 1;
    transform: scale(1);
  }
  &:exit-active {
    opacity: 0;
    transform: scale(0.98);
  }
`);

@inject('guiStore')
@observer
class HoverNode extends Component<{ guiStore?: GUIStore }> {
  node: HTMLElement;
  currentPosition: { x: number, y: number };
  text: { title: string, mods: Array<string> } = { title: '', mods: [] };

  set hoverState(value: boolean) {
    if (typeof this.props === 'undefined') return;

    this.props.guiStore!.isHovering = value;
  }

  @computed get hoverState() {
    if (typeof this.props === 'undefined') return false;

    return this.props.guiStore!.isHovering;
  }

  constructor(props: any) {
    super(props);

    this.hover = this.hover.bind(this);
    this.hoverOut = this.hoverOut.bind(this);
  }

  componentWillMount() {
    Emitter.on('hoverOver', this.hover);
    Emitter.on('hoverOut', this.hoverOut);
  }

  componentWillUnmount() {
    Emitter.removeListener('hoverOver', this.hover);
    Emitter.removeListener('hoverOut', this.hoverOut);
  }

  hover(position: { x: number, y: number }, point: MatrixPoint<PassiveNode>) {
    const node = point.context;

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
          <Inner position={this.currentPosition || { x: 0, y: 0 }} innerRef={(node: HTMLElement) => { this.node = node }}>
            <h3>{this.text.title}</h3>
            {
              this.text.mods.map((mod, index) => (
                <p key={index}>{mod}</p>
              ))
            }
          </Inner>
        }
      </TransitionGroup>
    );
  }
}

export default HoverNode;
