import React, { Fragment } from 'react';
import { ParseDateComponent } from './types';
import datePipe from '../../../pipes/datePipe';

function ParseDate({ date }: ParseDateComponent.Props) {
	return (
		<Fragment>
			{datePipe(date)}
		</Fragment>
	);
}

export default ParseDate;
