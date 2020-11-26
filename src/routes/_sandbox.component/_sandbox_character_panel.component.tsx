import { Fragment } from 'react';
import styled from 'styled-components';
import { CharacterItemDisplay } from '../../components/character_item_display.component';
import { OneAtomCommonPropType, Text } from 'one-atom';
import { Select } from '../../components/select.component';

export namespace SandboxCharacterPanel {
  export type Props = OneAtomCommonPropType & Record<string, unknown>;

  const elements = {
    container: styled.div`
      background: var(--global-foreground);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      width: 250px;
      padding: 0 14px;
      box-sizing: content-box;
      border-top: 1px solid var(--sandbox-border);
      border-bottom: 1px solid var(--sandbox-border);
    `,
    header: styled.div`
      display: flex;
      width: 100%;
      height: 40px;
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
        background: var(--sandbox-border);
        height: 1px;
      }
    `,
    panelRow: styled.div`
      display: flex;
      width: 100%;
      margin-bottom: 10px;
      height: 26px;

      .label {
        display: flex;
        align-items: center;
        padding-left: 10px;
        width: 110px;
      }

      .input {
        flex: 1;
        padding-right: 10px;
      }

      &::last-child {
        margin-bottom: 0;
      }
    `,
  };

  const Section: FC<{ label: string }> = function SandboxCharacterPanel_Section({ children, label }) {
    return (
      <Fragment>
        <elements.header>
          <Text.body>{label}</Text.body>
        </elements.header>
        {children}
      </Fragment>
    );
  };

  const PanelRow: FC<{ label: string; options: Select.Option[] }> = function SandboxCharacterPanel_PanelRow({ label, options }) {
    return (
      <elements.panelRow>
        <div className="label">
          <Text.body>{label}</Text.body>
        </div>
        <div className="input">
          <Select.h options={options} />
        </div>
      </elements.panelRow>
    );
  };

  export const h: FC<Props> = function SandboxCharacterPanel() {
    return (
      <elements.container>
        <Section label={'Character'}>
          <PanelRow
            label="Class"
            options={[
              {
                label: 'none',
                value: 'none',
              },
              {
                label: 'Marauder',
                value: 'Marauder',
              },
              {
                label: 'Duelist',
                value: 'Duelist',
              },
              {
                label: 'Ranger',
                value: 'Ranger',
              },
              {
                label: 'Shadow',
                value: 'Shadow',
              },
              {
                label: 'Witch',
                value: 'Witch',
              },
              {
                label: 'Templar',
                value: 'Templar',
              },
              {
                label: 'Scion',
                value: 'Scion',
              },
            ]}
          />
          <PanelRow
            label="Ascendancy"
            options={[
              {
                label: 'none',
                value: 'none',
              },
              {
                label: 'one',
                value: 'one',
              },
              {
                label: 'two',
                value: 'two',
              },
              {
                label: 'three',
                value: 'three',
              },
            ]}
          />
        </Section>
        <elements.divider />
        <Section label={'Items'}>
          <CharacterItemDisplay.h />
        </Section>
        <elements.divider />
        <Section label={'Gems'}>...</Section>
      </elements.container>
    );
  };
}
