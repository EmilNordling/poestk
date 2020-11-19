import React from 'react';
import styled from 'styled-components';
import { KiraPropType } from '@kira/ui-std';
import { CharacterItemDisplay } from '../../components/character_item_display';
import { Text } from '@kira/ui';

/**
 * change this
 */
export namespace CharacterPanel {
  export type Props = KiraPropType & {};

  const elements = {
    container: styled.div`
      background: var(--global-foreground);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      height: 100%;
      padding: 0 14px;
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
        background: var(--global-divider);
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
