import React from 'react';
import styled from 'styled-components';
import { Icon } from '../../components/icon.component';
import { KiraPropType, Button, AnchorPoint, useService } from 'one-atom';
import { MenuService } from '../../backend/menu_service';

export namespace Header {
  export type Props = KiraPropType & {};

  const elements = {
    container: styled.header`
      background: var(--global-foreground);
      height: 50px;
      width: 100%;
      flex-shrink: 0;
      align-items: center;
      display: flex;
      padding: 0 14px;
      justify-content: space-between;
    `,
    section: styled.div``,
  };

  export const h: FC<Props> = function Header() {
    const menuService = useService(MenuService);

    function handleClick(): void {
      if (menuService.isOpen()) {
        menuService.clearMenu();
      } else {
        menuService.setMenu({
          attachTo: 'test',
          builder: [
            {
              label: 'yee',
              key: '1',
            },
            {
              label: 'x',
              key: '2',
            },
            {
              label: 'ee',
              key: '3',
            },
            {
              label: 'asdasd',
              key: '4',
            },
          ],
        });
      }
    }

    return (
      <elements.container>
        <elements.section>
          <Button.alt label="a11y_todo" round onClick={handleClick}>
            <AnchorPoint.h name="test" top="-x" left="x-">
              <Icon.eva_menu />
            </AnchorPoint.h>
          </Button.alt>
        </elements.section>
        <elements.section></elements.section>
        <elements.section>
          <Button.action label="a11y_todo">Create</Button.action>
        </elements.section>
      </elements.container>
    );
  };
}
