import { Instantiation } from 'one-atom';
import { mockResponse } from '../http.service/mockResponse';
import { AuthApiService } from './auth_api.service';

test('asserts that service is resolved', () => {
  const authApiService = Instantiation.resolve(AuthApiService);

  expect(authApiService).toBeInstanceOf(AuthApiService);
});

test('asserts that "get" returns mocked data', async () => {
  const authApiService = Instantiation.resolve(AuthApiService);
  const expectedResult = 'worked';

  mockResponse('/auth', expectedResult);

  const response = await authApiService.get();
  expect(response).toBe(expectedResult);
});
