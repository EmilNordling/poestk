import { ResetCss } from 'one-atom';
import { useRef } from 'react';
import { FocusRingScope } from 'react-focus-rings';
import styled from 'styled-components';
import { Routes } from './routes.component';
import { Menu } from './menu.component';

interface Props {}

const elements = {
  container: styled.div`
    display: contents;

    *:focus {
      outline: none;
    }

    .focus-rings-ring {
      /* Ensure the ring doesn't affect the page */
      position: absolute;
      display: block;
      pointer-events: none;
      /* Default styling */
      background: none;
      margin: 0;
      padding: 0;
      border-radius: var(--__adaptive-focus-ring-radius, 4px);
      box-shadow: 0 0 0 2px var(--__adaptive-focus-ring-color, var(--focus-primary, #00bbff));
    }
  `,
};

export const App: FC<Props> = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <elements.container ref={containerRef}>
      <FocusRingScope containerRef={containerRef}>
        <ResetCss />
        <Menu />
        <Routes />
      </FocusRingScope>
    </elements.container>
  );
};

export default App;
