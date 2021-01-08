import styled from 'styled-components';
import { OneAtomCommonPropType } from 'one-atom';
import { Header } from './_header.component';
import { CharacterPanel } from './_character_panel.component';
import { StatsPanel } from './_stats_panel.component';
import { Tree } from './_tree.component';
import { useEffect } from 'react';
import { addDashboardStyle } from '../../modules/add_dashboard_style';

interface Props extends OneAtomCommonPropType {}

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

export const Inner: FC<Props> = () => {
  useEffect(() => {
    return addDashboardStyle();
  }, []);

  return (
    <elements.container>
      <Header />
      <elements.main>
        <CharacterPanel />
        <Tree />
        <StatsPanel />
      </elements.main>
      <elements.bottomBar></elements.bottomBar>
    </elements.container>
  );
};
