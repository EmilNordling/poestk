import React, { Suspense } from 'react';
import { RouteComponentProps } from 'react-router';

const Home = React.lazy(() => import('./Home'));

const LazyLoadHome = (props: RouteComponentProps) => {
	return (
		<Suspense fallback='loading ...'>
			<Home {...props} />
		</Suspense>
	);
};

export default LazyLoadHome;
