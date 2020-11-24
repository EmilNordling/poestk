import React from 'react';
import styled from 'styled-components';
import { KiraPropType } from 'one-atom';
import { Header } from './_sandbox_header.component';
import { CharacterPanel } from './_sandbox_character_panel.component';
import { StatsPanel } from './_sandbox_stats_panel.component';
import { Tree } from './_sandbox_tree.component';

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
      color: rgb(153, 153, 153);
      --sandbox-border: #191919;
    `,
    main: styled.main`
      display: flex;
      flex: 1;
    `,
    bottomBar: styled.div`
      background: var(--global-foreground);
      /* border-top: 1px solid var(--global-divider); */
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
