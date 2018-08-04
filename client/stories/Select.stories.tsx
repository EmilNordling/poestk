import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Select, Options } from '../src/common/select';

storiesOf('Select', module)

.add('fixed width', () => (
  <Select selected='0' onChange={action('clicked')} model='selectedAscendancy' width={200}>
    <Options value='0'>first</Options>
    <Options value='1'>second</Options>
    <Options value='2'>third</Options>
  </Select>
));
