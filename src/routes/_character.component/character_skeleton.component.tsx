import { View } from 'one-atom';
import { useEffect } from 'react';
import { addDashboardStyle } from '../../modules/add_dashboard_style';

export namespace CharacterSkeleton {
  export interface Props {}

  export const h: FC<Props> = function CharacterSkeleton() {
    useEffect(() => {
      return addDashboardStyle();
    }, []);

    return (
      <View.h background="var(--global-background)">
        <View.h direction="row">
          <View.h width={278} shrink={false} background="var(--global-foreground)"></View.h>
        </View.h>
      </View.h>
    );
  };
}
