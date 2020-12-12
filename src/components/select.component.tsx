import { OneAtomCommonPropType } from 'one-atom';
import styled from 'styled-components';

export namespace Select {
  export interface Props extends OneAtomCommonPropType {
    onChange?(): void;
    options: Option[];
  }

  export interface Option {
    value: string;
    label: string;
  }

  const elements = {
    wrapper: styled.div`
      position: relative;
      width: 100%;
      background-color: #282828;
      border-radius: 5px;

      &:hover {
        filter: brightness(120%) hue-rotate(2deg);
      }
    `,
    select: styled.select`
      color: var(--global-text-dimmed);
      font-size: 12px;
      font-weight: 400;
      border-radius: 5px;
      width: 100%;
      height: 26px;
      padding: 0 16px 1px 8px;
      box-sizing: border-box;
      -webkit-appearance: none;
      background: transparent;
      border: 1px solid transparent;
    `,
    option: styled.option`
      color: initial;
    `,
  };

  export const h: FC<Props> = function Select({ onChange, options }) {
    function handleChange(): void {
      if (onChange) onChange();
    }

    return (
      <elements.wrapper>
        <elements.select onChange={handleChange}>
          {options.map((option) => {
            return (
              <elements.option value={option.value} key={option.value}>
                {option.label}
              </elements.option>
            );
          })}
        </elements.select>
      </elements.wrapper>
    );
  };
}
