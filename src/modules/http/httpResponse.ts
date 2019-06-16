import { AxiosResponse } from 'axios';

export interface HttpResponse<T> extends AxiosResponse<T> { }

export interface HttpError {
	data: null;
	statusCode: number;
	errorCode: string;
	errorMessage: string;
	successful: boolean;
}

export interface InterceptResponse<T> {
	response: AxiosResponse<T> | null;
}

export type ApiPromise<T> = Promise<HttpResponse<T>>;

/**
 * @description
 * Interceptor to transform the response into a HttpResponse<T> object.
 */
function httpResponse<T>(response: AxiosResponse<T>): HttpResponse<T> {
	return response;
}

export default httpResponse;
