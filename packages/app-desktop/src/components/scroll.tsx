import { KiraPropType } from '@kira/ui-std';
import React from 'react';
import styled from 'styled-components';

/**
 * change this
 */
export namespace Scroll {
  export type Props = KiraPropType & {};

  const elements = {
    scroll: styled.div`
      display: flex;
      height: 100%;
      background-attachment: fixed;
      background-image: linear-gradient(rgb(0, 95, 255) 0%, rgb(146, 0, 255) 50%, rgb(255, 46, 25) 100%);
    `,
    scroller: styled.div`
      overflow-y: scroll;
      overflow-x: hidden;
    `,
  };

  export const h: React.FC<Props> = function Scroll({ children }) {
    return (
      <elements.scroll>
        <elements.scroller>{children}</elements.scroller>
      </elements.scroll>
    );
  };
}
