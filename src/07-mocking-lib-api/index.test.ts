// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');

  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((func) => func),
  };
});

describe('throttledGetDataFromApi', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const mockCreate = jest.spyOn(axios, 'create').mockReturnValue(axios);

    jest.spyOn(axios, 'get').mockResolvedValue({});

    await throttledGetDataFromApi('/api');

    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    jest.spyOn(axios, 'create').mockReturnValue(axios);
    jest.spyOn(axios, 'get').mockResolvedValue({});

    const relativePath = '/api';

    await throttledGetDataFromApi(relativePath);

    expect(axios.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const expectedData = { key: 'value' };

    jest.spyOn(axios, 'create').mockReturnValue(axios);
    jest.spyOn(axios, 'get').mockResolvedValue({ data: expectedData });

    const data = await throttledGetDataFromApi('/api');

    expect(data).toEqual(expectedData);
  });
});
