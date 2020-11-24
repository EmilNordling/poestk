import React from 'react';
import styled from 'styled-components';
import { KiraPropType } from 'one-atom';
import { SkillTreeScene } from '../../components/skill_tree/mod';

export namespace Tree {
  export type Props = KiraPropType & {};

  const elements = {
    container: styled.div`
      position: relative;
      flex: 1;
      background-color: var(--sandbox-background);
    `,
    shadow: styled.div`
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      box-shadow: inset 0px 0px 5px 2px rgb(0 0 0 / 15%), inset 0px 0 1px 1px rgb(0 0 0 / 10%);
    `,
  };

  export const h: React.FC<Props> = function Tree() {
    return (
      <elements.container>
        <SkillTreeScene.h />
        <elements.shadow></elements.shadow>
      </elements.container>
    );
  };
}
