import React from 'react';
import { render } from '@testing-library/react';
import { Character } from './mod';

describe('Character.component', () => {
  it('should render', () => {
    const { debug } = render(<Character.h />);

    debug();
  });
});
