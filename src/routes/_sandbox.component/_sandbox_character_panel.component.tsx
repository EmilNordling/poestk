import React from 'react';
import styled from 'styled-components';
import { CharacterItemDisplay } from '../../components/character_item_display.component';
import { KiraPropType, Text } from 'one-atom';

export namespace CharacterPanel {
  export type Props = KiraPropType & {};

  const elements = {
    container: styled.div`
      --kira-text-p-size: 0.8125rem;
      font-size: var(--kira-text-p-size);
      background: var(--global-foreground);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      height: 100%;
      padding: 0 14px;

      border-top: 1px solid var(--sandbox-border);
      border-bottom: 1px solid var(--sandbox-border);
    `,
    header: styled.div`
      display: flex;
      width: 100%;
      height: 48px;
      align-items: center;
    `,
    divider: styled.div`
      height: 21px;
      display: flex;
      width: 100%;
      position: relative;
      align-items: flex-end;

      &::after {
        content: '';
        width: 100%;
        background: var(--sandbox-border);
        height: 1px;
      }
    `,
  };

  export const h: React.FC<Props> = function CharacterPanel() {
    return (
      <elements.container>
        <elements.header>
          <Text.body>Items</Text.body>
        </elements.header>
        <CharacterItemDisplay.h></CharacterItemDisplay.h>

        <elements.divider></elements.divider>
        <elements.header>
          <Text.body>Gems</Text.body>
        </elements.header>
      </elements.container>
    );
  };
}
