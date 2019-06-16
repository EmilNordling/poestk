import { CancelTokenSource, AxiosRequestConfig } from 'axios';
import HttpParameters from './HttpParameters';

/**
 * @description
 * Class to hold the request options.
 */
class HttpOptions<T extends Object> {
	public readonly params = new HttpParameters();
	public readonly queryParam: T | undefined;
	public cancelToken: CancelTokenSource | undefined;
	public requestConfig: AxiosRequestConfig = {};

	constructor(config: {
		queryParam?: T,
		cancelToken?: CancelTokenSource,
		withCredentials?: boolean,
	} = { withCredentials: true }) {
		this.queryParam = config.queryParam;
		this.cancelToken = config.cancelToken;
		this.requestConfig.withCredentials = config.withCredentials;
	}
}

export default HttpOptions;
