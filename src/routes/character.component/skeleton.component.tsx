import { Layout } from 'one-atom';
import { useEffect } from 'react';
import { addDashboardStyle } from '../../modules/add_dashboard_style';

interface Props {}

export const Skeleton: FC<Props> = () => {
  useEffect(() => {
    return addDashboardStyle();
  }, []);

  return (
    <Layout background="var(--global-background)">
      <Layout direction="row">
        <Layout width={278} shrink={false} background="var(--global-foreground)"></Layout>
      </Layout>
    </Layout>
  );
};
