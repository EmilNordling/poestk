import React, { Fragment } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Icon from '../src/common/icon';
import { Row, Col } from '../src/common/grid';

storiesOf('Icon', module)
.add('library', () => (
  <Fragment>
    <div style={{ fontSize: '1.6rem' }}>
      <Row gutter={5}>
        <Col span={50}><Icon name='apps' /></Col>
        <Col span={50}><Icon name='appsRounded' /></Col>
        <Col span={50}><Icon name='arrow' /></Col>
        <Col span={50}><Icon name='arrowStroke' /></Col>
        <Col span={50}><Icon name='ascendancy' /></Col>
        <Col span={50}><Icon name='burger' /></Col>
        <Col span={50}><Icon name='burgerCompact' /></Col>
        <Col span={50}><Icon name='burgerSpacing' /></Col>
        <Col span={50}><Icon name='burgerThick' /></Col>
        <Col span={50}><Icon name='burgerThickRounded' /></Col>
        <Col span={50}><Icon name='checkmark' /></Col>
        <Col span={50}><Icon name='cloud' /></Col>
        <Col span={50}><Icon name='code' /></Col>
        <Col span={50}><Icon name='codeCircle' /></Col>
        <Col span={50}><Icon name='connection' /></Col>
        <Col span={50}><Icon name='exit' /></Col>
        <Col span={50}><Icon name='gear' /></Col>
        <Col span={50}><Icon name='gearFilled' /></Col>
        <Col span={50}><Icon name='heartbeat' /></Col>
      </Row>
      <Row gutter={5}>
        <Col span={50}><Icon name='iconTool' /></Col>
        <Col span={50}><Icon name='internetConnection' /></Col>
        <Col span={50}><Icon name='list' /></Col>
        <Col span={50}><Icon name='listBig' /></Col>
        <Col span={50}><Icon name='listBigRounded' /></Col>
        <Col span={50}><Icon name='listRounded' /></Col>
        <Col span={50}><Icon name='logo' /></Col>
        <Col span={50}><Icon name='moon' /></Col>
        <Col span={50}><Icon name='moonFilled' /></Col>
        <Col span={50}><Icon name='options' /></Col>
        <Col span={50}><Icon name='plusSharp' /></Col>
        <Col span={50}><Icon name='rocket' /></Col>
        <Col span={50}><Icon name='rocketFilled' /></Col>
        <Col span={50}><Icon name='rocketWindow' /></Col>
        <Col span={50}><Icon name='search' /></Col>
        <Col span={50}><Icon name='split' /></Col>
        <Col span={50}><Icon name='varning' /></Col>
        <Col span={50}><Icon name='window' /></Col>
      </Row>
    </div>
    <div style={{ fontSize: '3rem' }}>
      <Row gutter={10}>
        <Col span={40}><Icon name='apps' /></Col>
        <Col span={40}><Icon name='appsRounded' /></Col>
        <Col span={40}><Icon name='arrow' /></Col>
        <Col span={40}><Icon name='arrowStroke' /></Col>
        <Col span={40}><Icon name='ascendancy' /></Col>
        <Col span={40}><Icon name='burger' /></Col>
        <Col span={40}><Icon name='burgerCompact' /></Col>
        <Col span={40}><Icon name='burgerSpacing' /></Col>
        <Col span={40}><Icon name='burgerThick' /></Col>
        <Col span={40}><Icon name='burgerThickRounded' /></Col>
        <Col span={40}><Icon name='checkmark' /></Col>
        <Col span={40}><Icon name='cloud' /></Col>
        <Col span={40}><Icon name='code' /></Col>
        <Col span={40}><Icon name='codeCircle' /></Col>
        <Col span={40}><Icon name='connection' /></Col>
        <Col span={40}><Icon name='exit' /></Col>
        <Col span={40}><Icon name='gear' /></Col>
        <Col span={40}><Icon name='gearFilled' /></Col>
        <Col span={40}><Icon name='heartbeat' /></Col>
      </Row>
      <Row gutter={10}>
        <Col span={40}><Icon name='iconTool' /></Col>
        <Col span={40}><Icon name='internetConnection' /></Col>
        <Col span={40}><Icon name='list' /></Col>
        <Col span={40}><Icon name='listBig' /></Col>
        <Col span={40}><Icon name='listBigRounded' /></Col>
        <Col span={40}><Icon name='listRounded' /></Col>
        <Col span={40}><Icon name='logo' /></Col>
        <Col span={40}><Icon name='moon' /></Col>
        <Col span={40}><Icon name='moonFilled' /></Col>
        <Col span={40}><Icon name='options' /></Col>
        <Col span={40}><Icon name='plusSharp' /></Col>
        <Col span={40}><Icon name='rocket' /></Col>
        <Col span={40}><Icon name='rocketFilled' /></Col>
        <Col span={40}><Icon name='rocketWindow' /></Col>
        <Col span={40}><Icon name='search' /></Col>
        <Col span={40}><Icon name='split' /></Col>
        <Col span={40}><Icon name='varning' /></Col>
        <Col span={40}><Icon name='window' /></Col>
      </Row>
    </div>
    <div style={{ fontSize: '4rem' }}>
      <Row gutter={10}>
        <Col span={31}><Icon name='apps' /></Col>
        <Col span={31}><Icon name='appsRounded' /></Col>
        <Col span={31}><Icon name='arrow' /></Col>
        <Col span={31}><Icon name='arrowStroke' /></Col>
        <Col span={31}><Icon name='ascendancy' /></Col>
        <Col span={31}><Icon name='burger' /></Col>
        <Col span={31}><Icon name='burgerCompact' /></Col>
        <Col span={31}><Icon name='burgerSpacing' /></Col>
        <Col span={31}><Icon name='burgerThick' /></Col>
        <Col span={31}><Icon name='burgerThickRounded' /></Col>
        <Col span={31}><Icon name='checkmark' /></Col>
        <Col span={31}><Icon name='cloud' /></Col>
        <Col span={31}><Icon name='code' /></Col>
        <Col span={31}><Icon name='codeCircle' /></Col>
        <Col span={31}><Icon name='connection' /></Col>
        <Col span={31}><Icon name='exit' /></Col>
        <Col span={31}><Icon name='gear' /></Col>
        <Col span={31}><Icon name='gearFilled' /></Col>
        <Col span={31}><Icon name='heartbeat' /></Col>
      </Row>
      <Row gutter={10}>
        <Col span={31}><Icon name='iconTool' /></Col>
        <Col span={31}><Icon name='internetConnection' /></Col>
        <Col span={31}><Icon name='list' /></Col>
        <Col span={31}><Icon name='listBig' /></Col>
        <Col span={31}><Icon name='listBigRounded' /></Col>
        <Col span={31}><Icon name='listRounded' /></Col>
        <Col span={31}><Icon name='logo' /></Col>
        <Col span={31}><Icon name='moon' /></Col>
        <Col span={31}><Icon name='moonFilled' /></Col>
        <Col span={31}><Icon name='options' /></Col>
        <Col span={31}><Icon name='plusSharp' /></Col>
        <Col span={31}><Icon name='rocket' /></Col>
        <Col span={31}><Icon name='rocketFilled' /></Col>
        <Col span={31}><Icon name='rocketWindow' /></Col>
        <Col span={31}><Icon name='search' /></Col>
        <Col span={31}><Icon name='split' /></Col>
        <Col span={31}><Icon name='varning' /></Col>
        <Col span={31}><Icon name='window' /></Col>
      </Row>
    </div>
  </Fragment>
));
