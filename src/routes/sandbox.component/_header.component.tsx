import styled from 'styled-components';
import { Icon } from '../../components/icon.component';
import { OneAtomCommonPropType, Button, AnchorPoint, useService } from 'one-atom';
import { MenuItem, MenuSeparator, MenuController } from '../../application_delegate/menu.controller';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

interface Props extends OneAtomCommonPropType {}

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

export const Header: FC<Props> = () => {
  const menuController = useService(MenuController);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      menuController.clearMenu();
    };
  }, []);

  function handleClick(): void {
    if (menuController.isOpen()) {
      menuController.clearMenu();
    } else {
      menuController.setMenu({
        attachTo: 'test',
        builder: [
          new MenuItem({
            key: 'char',
            label: 'Go To Characters',
            click() {
              navigate('../');
            },
          }),
          new MenuSeparator({ key: 'sep' }),
          new MenuItem({
            key: 'build',
            label: 'Build',
            subMenu: [
              new MenuItem({
                key: 'new',
                label: 'new character',
              }),
              new MenuItem({
                key: 'open',
                label: 'open character',
              }),
            ],
          }),
          new MenuItem({
            key: 'edit',
            label: 'Edit',
            subMenu: [
              new MenuItem({
                key: 'undo',
                label: 'undo',
              }),
              new MenuItem({
                key: 'redo',
                label: 'redo',
              }),
            ],
          }),
        ],
      });
    }
  }

  return (
    <elements.container>
      <elements.section>
        <Button.alt label="a11y_todo" round onClick={handleClick}>
          <AnchorPoint name="test" top="-x" left="x-">
            <Icon.eva_menu />
          </AnchorPoint>
        </Button.alt>
      </elements.section>
      <elements.section></elements.section>
      <elements.section></elements.section>
    </elements.container>
  );
};
