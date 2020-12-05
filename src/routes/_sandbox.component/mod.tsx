import styled from 'styled-components';
import { OneAtomCommonPropType } from 'one-atom';
import { SandboxHeader } from './_sandbox_header.component';
import { SandboxCharacterPanel } from './_sandbox_character_panel.component';
import { SandboxStatsPanel } from './_sandbox_stats_panel.component';
import { SandboxTree } from './_sandbox_tree.component';
import { useEffect } from 'react';
import { addDashboardStyle } from '../../modules/add_dashboard_style';

/**
 * change this
 */
export namespace Sandbox {
  export type Props = OneAtomCommonPropType & Record<string, unknown>;

  const elements = {
    container: styled.div`
      display: flex;
      height: 100%;
      width: 100%;
      flex-direction: column;
      color: rgb(153, 153, 153);
      --sandbox-border: #171717;
      --oa-text-p-size: 0.8125rem;
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

  export const h: FC<Props> = function Sandbox() {
    useEffect(() => {
      return addDashboardStyle();
    }, []);

    return (
      <elements.container>
        <SandboxHeader.h />
        <elements.main>
          <SandboxCharacterPanel.h />
          <SandboxTree.h />
          <SandboxStatsPanel.h />
        </elements.main>
        <elements.bottomBar></elements.bottomBar>
      </elements.container>
    );
  };
}
