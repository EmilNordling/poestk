import React from 'react';
import styled from 'styled-components';
import { KiraPropType } from '@kira/ui-std';
import { CharacterItemDisplay } from '../../components/character_item_display';

/**
 * change this
 */
export namespace CharacterPanel {
  export type Props = KiraPropType & {};

  const elements = {
    container: styled.div`
      background: var(--global-foreground);
      display: flex;
      flex-shrink: 0;
      justify-content: center;
      height: 100%;
      padding: 10px;
    `,
  };

  export const h: React.FC<Props> = function CharacterPanel() {
    return (
      <elements.container>
        <CharacterItemDisplay.h></CharacterItemDisplay.h>
      </elements.container>
    );
  };
}
