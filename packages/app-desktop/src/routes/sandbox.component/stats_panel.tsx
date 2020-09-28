import React from 'react';
import styled from 'styled-components';
import { KiraPropType } from '@kira/ui-std';
import { Text } from '@kira/ui';

/**
 * change this
 */
export namespace StatsPanel {
  export type Props = KiraPropType & {};

  const elements = {
    container: styled.div`
      background: var(--global-foreground);
      width: 300px;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      height: 100%;
      padding: 0 10px;

      --kira-text-p-size: 0.9rem;
    `,
    row: styled.div`
      display: flex;
      align-items: center;
      height: 40px;
    `,
    label: styled.div`
      text-overflow: ellipsis;
      flex: 1;
    `,
  };

  const Row: React.FC<{ title: string }> = function StatsPanel_Row({ title }) {
    return (
      <elements.row>
        <elements.label>
          <Text.body>{title}</Text.body>
        </elements.label>

        <elements.label>
          <div>{Math.round(Math.random() * 1500)}</div>
        </elements.label>
      </elements.row>
    );
  };

  export const h: React.FC<Props> = function StatsPanel() {
    return (
      <elements.container>
        <Row title={'Average Damage'} />
        <Row title={'Total DPS'} />
        <Row title={'Mana Cost'} />

        <Row title={'Life'} />
        <Row title={'Mana'} />

        <Row title={'Energy Shield'} />
        <Row title={'Evasion Rating'} />

        <Row title={'Strength'} />
        <Row title={'Intelligence'} />
        <Row title={'Dexterity'} />
      </elements.container>
    );
  };
}
