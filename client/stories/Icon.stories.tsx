import React, { Fragment } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Icon, { iconMap } from '../src/common/icon';
import { Row, Col } from '../src/common/grid';

storiesOf('Icon', module)
.add('library', () => {
  const icons = Object.keys(iconMap).map(x => <Col span={15} key={x}><Icon name={x} /></Col>);

  return (
    <Row style={{ fontSize: '9rem', color: 'red' }} gutter={20}>{icons}</Row>
  );
});
