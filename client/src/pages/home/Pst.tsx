import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { BuildStore } from '../../stores';

const PstContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  user-select: none;
`;

@inject('buildStore')
@observer
class Pst extends Component<{ buildStore?: BuildStore}> {
  private containerRef = React.createRef<HTMLElement>();

  componentDidMount() {
    this.props.buildStore!.load(this.containerRef.current!);
  }

  render() {
    return (
      <PstContainer innerRef={this.containerRef} />
    );
  }
}

export default Pst;
