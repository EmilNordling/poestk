import React, { Suspense, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Character } from '../../modules/virutalCharacter';

const Sandbox = React.lazy(() => import('./Sandbox'));

const LazyLoadSandbox = (props: RouteComponentProps<{ id: string }>) => {
	useEffect(() => {

	}, []);

	return (
		<Suspense fallback='loading ...'>
			<Sandbox {...props} />
		</Suspense>
	);
};

export default LazyLoadSandbox;
