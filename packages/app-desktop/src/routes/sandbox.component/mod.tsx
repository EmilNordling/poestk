import React from 'react';
import styled from 'styled-components';
import { KiraPropType } from '@kira/ui-std';
import { StatsPanel } from './stats_panel';
import { CharacterPanel } from './character_panel';
import { Tree } from './tree';
import { Header } from './header';

/**
 * change this
 */
export namespace Sandbox {
  export type Props = KiraPropType & {};

  const elements = {
    container: styled.div`
      display: flex;
      height: 100%;
      width: 100%;
      flex-direction: column;
    `,
    main: styled.main`
      display: flex;
      flex: 1;
    `,
    bottomBar: styled.div`
      background: var(--global-foreground);
      border-top: 1px solid var(--global-divider);
      flex-shrink: 0;
      height: 14px;
      width: 100%;
    `,
  };

  export const h: React.FC<Props> = function Sandbox() {
    return (
      <elements.container>
        <Header.h />
        <elements.main>
          <CharacterPanel.h />
          <Tree.h />
          <StatsPanel.h />
        </elements.main>
        <elements.bottomBar></elements.bottomBar>
      </elements.container>
    );
  };
}
