import { HttpResponse } from './httpResponse';

function mockResponse<T>(data: T): HttpResponse<T> {
	return {
		data,
		config: {},
		headers: {},
		request: null,
		status: 200,
		statusText: '',
	};
}

export default mockResponse;
