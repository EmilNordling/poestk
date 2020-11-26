import styled from 'styled-components';
import { OneAtomCommonPropType, Text } from 'one-atom';

export namespace SandboxStatsPanel {
  export type Props = OneAtomCommonPropType & Record<string, unknown>;

  const elements = {
    container: styled.div`
      --oa-text-p-size: 0.8125rem;
      font-size: var(--oa-text-p-size);
      background: var(--global-foreground);
      width: 300px;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      height: 100%;

      border-top: 1px solid var(--sandbox-border);
      border-bottom: 1px solid var(--sandbox-border);
    `,
    row: styled.div`
      display: flex;
      align-items: center;
      height: 40px;
    `,
    label: styled.div`
      text-overflow: ellipsis;
      flex: 1;
      padding-left: 14px;
    `,
  };

  const Row: FC<{ title: string }> = function SandboxStatsPanel_Row({ title }) {
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

  export const h: FC<Props> = function SandboxStatsPanel() {
    return (
      <elements.container>
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
