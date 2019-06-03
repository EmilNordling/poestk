import Axios from 'axios';
import { useState, useEffect } from 'react';
import HttpOptions from '../../modules/http/HttpOptions';

export enum FetchStateEnum {
	PENDING,
	SUCCESS,
	FAILED,
}

type GetArgumentTypes<T extends Function> = T extends (...x: infer argumentsType) => any ? argumentsType : never;

type Data<T> = {
	response: T | undefined,
	status: FetchStateEnum,
	error: Error | undefined,
};

/**
 * @description
 * Hook to fetch data from the API.
 */
function useFetch<T, R extends Array<any>>(
	request: (...args: R) => Promise<T>,
	...args: GetArgumentTypes<typeof request>
) {
	const [dataChunk, setDataChunk] = useState<Data<T>>(
		{
			response: undefined,
			status: FetchStateEnum.PENDING,
			error: undefined,
		},
	);

	useEffect(() => {
		let response;

		const source = Axios.CancelToken.source();

		const httpOptionsArgument: HttpOptions<any> | undefined = args[args.length - 1] as any;

		if (!httpOptionsArgument || !(httpOptionsArgument instanceof HttpOptions)) {
			// This is to force a HttpOptions to always be included with a cancelToken
			args.push(new HttpOptions({
				cancelToken: source,
			}) as any);
		} else {
			httpOptionsArgument.cancelToken = source;
		}

		(async () => {
			try {
				response = await request(...args);

				if (!source.token.reason) {
					setDataChunk({
						response,
						error: undefined,
						status: FetchStateEnum.SUCCESS,
					});
				}
			} catch (error) {
				if (process.env.NODE_ENV !== 'production') {
					console.error(error);
				}

				setDataChunk({
					error,
					response: undefined,
					status: FetchStateEnum.FAILED,
				});
			}
		})();

		// If a component is demounted, Axios should not emit the requested data.
		return () => {
			source.cancel();
		};
	}, []);

	return dataChunk;
}

export default useFetch;
