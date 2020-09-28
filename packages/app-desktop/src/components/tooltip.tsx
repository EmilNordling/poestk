import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { HeadLessPopover, KiraPropType } from '@kira/ui-std';
import { Icon } from './icon';

export namespace Tooltip {
  export type Props = KiraPropType & {
    attachTo: string;
    visible: boolean;
    text: string;
  };

  const elements = {
    popover: styled(motion.div)<{ x: number; y: number }>`
      pointer-events: all;
      position: absolute;
      top: ${({ y }) => y}px;
      left: ${({ x }) => x}px;
      transform-origin: 0 0;
    `,
    tool_tip: styled.div`
      display: flex;
      align-items: center;
      position: relative;
      background-color: #333333;
      color: #ffffff;
      padding: 10px;
      border-radius: 6px;
      transform: translateY(-50%);
      box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05), 0 4px 10px rgba(0, 0, 0, 0.3);
      text-transform: capitalize;
      font-size: 0.75rem;

      .arrow {
        display: flex;
        color: #333333;
        font-size: 16px;
        left: 2px;
        pointer-events: none;
        position: absolute;
        left: calc(16px * -1);
      }
    `,
  };

  export const h: React.FC<Props> = function Tooltip({ visible, text, attachTo }) {
    return (
      <AnimatePresence initial={false}>
        {visible && (
          <HeadLessPopover.h attachTo={attachTo}>
            {({ x, y }) => {
              return (
                <elements.popover
                  x={x + 10}
                  y={y}
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.1 } }}
                >
                  <elements.tool_tip>
                    {text}
                    <div className='arrow'>
                      <Icon.arrow />
                    </div>
                  </elements.tool_tip>
                </elements.popover>
              );
            }}
          </HeadLessPopover.h>
        )}
      </AnimatePresence>
    );
  };
}
