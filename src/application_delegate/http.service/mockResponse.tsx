/** # Don't reference this variable */
export const _mockedResponseData: Record<string, unknown> = Object.create(null);

export function mockResponse(key: string, data: unknown): void {
  if (_mockedResponseData[key]) {
    throw new Error(`previous "${key}" has never been exhausted, your tests may be faulty if this happen`);
  }

  _mockedResponseData[key] = data;
}
