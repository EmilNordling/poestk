import { Text } from 'one-atom';

export namespace Toggle {
  export interface Props {}

  export const h: FC<Props> = function Toggle() {
    return <Text.h1_plus>One Atom</Text.h1_plus>;
  };
}
