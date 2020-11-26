import App from './app.component';
import { render } from '@testing-library/react';

test('app.component', () => {
  const { container } = render(<App />);

  expect(container).toBeTruthy();
});
