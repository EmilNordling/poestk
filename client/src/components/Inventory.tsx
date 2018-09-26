import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { colors } from '../constants';
import { Col, Row } from '../common/grid';
import { Label } from '../common/text';
import { BuildStore } from '../stores';
import GUIStore from '../stores/GUIStore';

const Container = styled.div`
  position: relative;
  height: 360px;
  width: 360px;
`;

const Item = styled.div`
  position: absolute;
  top: ${(props) => props.top}px;
  right: ${(props) => props.right}px;
  bottom: ${(props) => props.bottom}px;
  left: ${(props) => props.left}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  background: ${colors.backdrop};
`;

interface InventorylProps {
  guiStore?: GUIStore;
  buildStore?: BuildStore;
}

const Modal: React.SFC = () => (
  <div>qweqwe</div>
);

@inject('buildStore', 'guiStore')
@observer
class Inventory extends Component<InventorylProps> {
  private handleClick = () => {
    this.props.guiStore!.addModal(<Modal />);
  }

  render() {
    const { loading, activeBuild, change } = this.props.buildStore!;

    if (loading) return <></>;

    return (
      <Container>
        <Item onClick={this.handleClick} width={84} height={160} top={20} />
        <Item width={84} height={160} top={20} right={0} />

        <Item width={84} height={84} left={138} />

        <Item width={84} height={132} left={138} top={90} />

        <Item width={84} height={84} left={48} bottom={90} />
        <Item width={84} height={84} right={48} bottom={90} />

        <Item width={42} height={42} left={90} top={138} />
        <Item width={42} height={42} right={90} top={90} />
        <Item width={42} height={42} right={90} top={138} />

        <Item width={84} height={42} left={138} bottom={90} />

        <Item width={42} height={84} left={63} bottom={0} />
        <Item width={42} height={84} left={111} bottom={0} />
        <Item width={42} height={84} left={159} bottom={0} />
        <Item width={42} height={84} right={111} bottom={0} />
        <Item width={42} height={84} right={63} bottom={0} />
      </Container>
    );
  }
}

export default Inventory;
