import { Suspense, useEffect } from 'react';
import { Skeleton } from './skeleton.component';
import { addDashboardStyle } from '../../modules/add_dashboard_style';
import { Inner } from './_inner.component';

interface Props {}

// const elements = {};

export const Sandbox: FC<Props> = () => {
  useEffect(() => {
    return addDashboardStyle();
  }, []);

  return (
    <Suspense fallback={<Skeleton />}>
      <Inner />
    </Suspense>
  );
};
