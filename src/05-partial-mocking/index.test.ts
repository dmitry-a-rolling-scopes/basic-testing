// Uncomment the code below and write your tests
import { mockOne, mockThree, mockTwo, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const mockConsoleLog = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    mockOne();
    mockTwo();
    mockThree();

    expect(mockConsoleLog).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const mockConsoleLog = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    unmockedFunction();

    expect(mockConsoleLog).toHaveBeenCalledWith('I am not mocked');
  });
});
