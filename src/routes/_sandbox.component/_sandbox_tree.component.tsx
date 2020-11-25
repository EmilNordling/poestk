import React from 'react';
import styled from 'styled-components';
import { KiraPropType } from 'one-atom';
import { SkillTreeScene } from '../../components/skill_tree/mod';

export namespace SandboxTree {
  export type Props = KiraPropType & Record<string, unknown>;

  const elements = {
    container: styled.div`
      position: relative;
      flex: 1;
      background-color: var(--sandbox-background);
    `,
    treeWrapper: styled.div`
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
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

  export const h: FC<Props> = function SandboxTree() {
    return (
      <elements.container>
        <elements.treeWrapper>
          <SkillTreeScene.h />
        </elements.treeWrapper>
        <elements.shadow></elements.shadow>
      </elements.container>
    );
  };
}
