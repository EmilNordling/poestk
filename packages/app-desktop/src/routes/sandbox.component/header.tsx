import React from 'react';
import styled from 'styled-components';
import { KiraPropType } from '@kira/ui-std';
import { use_service } from '@kira/instantiation';
import { BuildService } from '../../backend/services/build_service';
import { Button } from '@kira/ui';
import { Icon } from '../../components/icon';

/**
 * change this
 */
export namespace Header {
  export type Props = KiraPropType & {};

  const elements = {
    container: styled.header`
      background: var(--global-foreground);
      border-bottom: 1px solid var(--global-divider);
      height: 60px;
      width: 100%;
      flex-shrink: 0;
      align-items: center;
      display: flex;
      padding: 0 14px;
      justify-content: space-between;
    `,
    section: styled.div``,
  };

  export const h: React.FC<Props> = function Header() {
    const buildService = use_service(BuildService);

    return (
      <elements.container>
        <elements.section>
          <Button.alt label='a11y_todo' round>
            <Icon.eva_menu />
          </Button.alt>
        </elements.section>
        <elements.section></elements.section>
        <elements.section>
          <Button.action
            label='a11y_todo'
            onClick={() => {
              console.log(buildService.create());
            }}
          >
            Create
          </Button.action>
        </elements.section>
      </elements.container>
    );
  };
}
