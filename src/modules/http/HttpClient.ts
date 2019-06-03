import Axios, { AxiosResponse } from 'axios';
import httpResponse from './httpResponse';
import HttpOptions from './HttpOptions';
import applicationSettings from '../../../env/applicationSettings.json';
import applicationSettingsDev from '../../../env/applicationSettings.dev.json';

export type HttpArguments<T> = [T, HttpOptions<never>];

interface EnvironmentConfig {
	APIRoot: string;
	enableMock: boolean;
	throttle: number;
}

/**
 * @description
 * Helper function to load config values based on environment run time.
 */
function loadEnvProperty<T extends keyof EnvironmentConfig>(property: T): EnvironmentConfig[T] {
	if (process.env.NODE_ENV !== 'production') {
		return applicationSettingsDev[property];
	}

	return applicationSettings[property];
}

class HttpClient {
	public enableMock: boolean = loadEnvProperty('enableMock');
	public throttle: number = loadEnvProperty('throttle');
	public readonly APIRoot: string = loadEnvProperty('APIRoot');

	public async get<T, K = {}>(uri: string, options: HttpOptions<K>) {
		const {
			cancelToken = Axios.CancelToken.source(),
		} = options;

		const response = await Axios.get<T>(`${this.APIRoot}${uri}${options.params.getString()}`, {
			cancelToken: cancelToken.token,
			...options.requestConfig,
		});

		if (process.env.NODE_ENV !== 'production' && !!this.throttle) {
			await new Promise(resolve => setTimeout(resolve, this.throttle));
		}

		return httpResponse(response);
	}

	public async post<T, K = {}>(uri: string, body: any, options: HttpOptions<K>) {
		const {
			cancelToken = Axios.CancelToken.source(),
		} = options;

		const response = await Axios.post<T>(
			`${this.APIRoot}${uri}${options.params.getString()}`,
			JSON.stringify(body),
			{
				cancelToken: cancelToken.token,
				...options.requestConfig,
			},
		);

		if (process.env.NODE_ENV !== 'production' && !!this.throttle) {
			await new Promise(resolve => setTimeout(resolve, this.throttle));
		}

		return httpResponse(response);
	}

	public async put<T, K = {}>(uri: string, body: any, options: HttpOptions<K>) {
		const {
			cancelToken = Axios.CancelToken.source(),
		} = options;

		const response = await Axios.put<T>(
			`${this.APIRoot}${uri}${options.params.getString()}`,
			JSON.stringify(body),
			{
				cancelToken: cancelToken.token,
				...options.requestConfig,
			},
		);

		if (process.env.NODE_ENV !== 'production' && !!this.throttle) {
			await new Promise(resolve => setTimeout(resolve, this.throttle));
		}

		return httpResponse(response);
	}

	public async delete<T, K = {}>(uri: string, options: HttpOptions<K>) {
		const {
			cancelToken = Axios.CancelToken.source(),
		} = options;

		const response: AxiosResponse<T> = await Axios.delete(
			`${this.APIRoot}${uri}${options.params.getString()}`,
			{
				cancelToken: cancelToken.token,
				...options.requestConfig,
			},
		);

		if (process.env.NODE_ENV !== 'production' && !!this.throttle) {
			await new Promise(resolve => setTimeout(resolve, this.throttle));
		}

		return httpResponse(response);
	}
}

export default new HttpClient();
