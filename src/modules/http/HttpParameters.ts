/**
 * @description
 * Builds an query string based on it's current appended value.
 *
 * @usageNotes
 * ### Using HttpParameters
 *
 * The following example shows how to use HttpParameters.
 *
 * ```ts
 * const httpParameters = new HttpParameters();
 *
 * httpParameters.append({ first: 1, second: 2 });
 * httpParameters.getString(); // '?first=1&second=2'
 * ```
 */
class HttpParameters<T extends { [key: string]: any } = {}> {
	/**
	 * Map of current parameters.
	 */
	private parameters: T = Object.create(null);

	/**
	 * Appends a new object of parameters
	 */
	public append(item: T) {
		Object.assign(this.parameters, item);
	}

	/**
	 * Clears the parameter maps.
	 */
	public clearParameters() {
		this.parameters = Object.create(null);
	}

	/**
	 * Returns a query string based on the values in the map.
	 */
	public getString(): string {
		if (Object.keys(this.parameters).length === 0) return '';

		const entries = Object.entries(this.parameters);

		return entries.reduce(
			(accumulator, currentValue, currentIndex) => {
				let combine = accumulator + currentValue.join('=');

				if (entries.length - 1 !== currentIndex) {
					combine += '&';
				}

				return combine;
			}, '?',
		);
	}
}

export default HttpParameters;
