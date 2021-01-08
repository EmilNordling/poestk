import styled from 'styled-components';
import { OneAtomCommonPropType } from 'one-atom';
import { SkillTree } from '../../components/skill_tree.component';

interface Props extends OneAtomCommonPropType {}

const elements = {
  container: styled.div`
    position: relative;
    flex: 1;
    background-color: var(--sandbox-background);
  `,
  treeWrapper: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  `,
  shadow: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    box-shadow: inset 0px 0px 5px 2px rgb(0 0 0 / 15%), inset 0px 0 1px 1px rgb(0 0 0 / 10%);
  `,
};

export const Tree: FC<Props> = () => {
  return (
    <elements.container>
      <elements.treeWrapper>
        <SkillTree />
      </elements.treeWrapper>
      <elements.shadow></elements.shadow>
    </elements.container>
  );
};
