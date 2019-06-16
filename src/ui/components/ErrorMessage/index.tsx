import React from 'react';
import Center from '../../containers/Center';

function ErrorMessage({ message }: { message: string }) {
	return <Center>😞 | {message}</Center>;
}

export default ErrorMessage;
