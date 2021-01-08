import { useRef } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { HeadLessPopover, useApplicationState, useService } from 'one-atom';
import { MenuItem, MenuSeparator, MenuController } from '../application_delegate/menu.controller';

interface Props {}

const elements = {
  popover: styled(motion.div)<{ xPos: number; yPos: number }>`
    top: ${({ yPos }) => yPos}px;
    left: ${({ xPos }) => xPos}px;
    pointer-events: all;
    position: absolute;
    transform-origin: 50% 0%;
    width: 280px;
    font-size: 0.6875rem; // 11px
    font-weight: 500;
    line-height: 1.2;
    border-radius: 8px;
    padding: 5px;
    background-color: #2b2b2b;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05), 0 4px 10px rgba(0, 0, 0, 0.3);

    .inner {
      .separator {
        height: 19px;
        display: flex;
        width: 100%;
        position: relative;
        align-items: center;
        padding: 0 10px;

        &::after {
          content: '';
          width: 100%;
          background: #666;
          height: 1px;
        }
      }

      .inner {
        border-radius: 4px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 6px 10px;
        pointer-events: none;
      }

      &.noPointerEvents {
        pointer-events: none;
      }

      &:hover {
        .inner {
          background: #09f;
        }
      }
    }
  `,
};

export const Menu: FC<Props> = function Menu() {
  const menuController = useService(MenuController);
  const state = useApplicationState(menuController.state);
  const ref = useRef<HTMLDivElement>(null);

  function handleClick(menuItem: MenuItem): void {
    menuItem.click();
    menuController.clearMenu();
  }

  function handleAnimationStart(): void {
    if (ref.current && menuController.state.read().menu) {
      ref.current.focus();
    }
  }

  return (
    <AnimatePresence initial={false}>
      {state.menu !== null && (
        <HeadLessPopover attachTo={state.menu.attachTo}>
          {({ x, y }) => {
            return (
              <elements.popover
                ref={ref}
                xPos={x}
                yPos={y + 6}
                tabIndex={0}
                initial={{ opacity: 0.5, y: -10 }}
                animate={{ opacity: 1, transition: { duration: 0.15 }, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.15 }, y: 10 }}
                onAnimationStart={handleAnimationStart}
              >
                {state.menu?.builder.map((item) => {
                  if (item instanceof MenuSeparator) {
                    return (
                      <li key={item.key}>
                        <div className="separator"></div>
                      </li>
                    );
                  }

                  function callClick(item: MenuItem): void {
                    if (item.subMenu && item.subMenu.length > 0) {
                      return;
                    }

                    handleClick(item);
                  }

                  return (
                    <div
                      tabIndex={0}
                      role="button"
                      className="inner"
                      key={item.key}
                      onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                          callClick(item);
                        }
                      }}
                      onClick={() => {
                        callClick(item);
                      }}
                    >
                      <div className="inner">{item.label}</div>
                    </div>
                  );
                })}
              </elements.popover>
            );
          }}
        </HeadLessPopover>
      )}
    </AnimatePresence>
  );
};
