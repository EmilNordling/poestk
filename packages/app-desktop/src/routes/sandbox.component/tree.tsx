import React from 'react';
import styled from 'styled-components';
import { KiraPropType } from '@kira/ui-std';

/**
 * change this
 */
export namespace Tree {
  export type Props = KiraPropType & {};

  const elements = {
    container: styled.div`
      flex: 1;
      background-color: var(--sandbox-background);
      border-left: 1px solid var(--global-divider);
      border-right: 1px solid var(--global-divider);
    `,
  };

  export const h: React.FC<Props> = function Tree() {
    return <elements.container></elements.container>;
  };
}
