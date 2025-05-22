// Uncomment the code below and write your tests
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import path from 'node:path';
import fs from 'node:fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockSetTimeout = jest.spyOn(global, 'setTimeout');

    const callback = () => {};
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(mockSetTimeout).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    let calledAfterTimeout = false;

    const callback = () => {
      calledAfterTimeout = true;
    };

    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(calledAfterTimeout).toBe(false);

    jest.advanceTimersByTime(timeout);

    expect(calledAfterTimeout).toBe(true);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mockSetInterval = jest.spyOn(global, 'setInterval');

    const callback = () => {};
    const timeout = 1000;

    doStuffByInterval(callback, timeout);

    expect(mockSetInterval).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callsCount = 3;
    let expectedCallsCount = 0;

    const callback = () => {
      expectedCallsCount++;
    };

    const timeout = 1000;

    doStuffByInterval(callback, timeout);

    expect(expectedCallsCount).toBe(0);

    for (let count = 1; count <= callsCount; count++) {
      jest.advanceTimersByTime(timeout);
    }

    expect(expectedCallsCount).toBe(callsCount);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'existing.file';

    jest.spyOn(path, 'join');

    await readFileAsynchronously(pathToFile);

    expect(path.join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'non-existing.file';

    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const content = await readFileAsynchronously(pathToFile);

    expect(content).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const expectedContent = 'expected content';

    jest.spyOn(fs, 'existsSync').mockReturnValue(true);

    jest
      .spyOn(fs.promises, 'readFile')
      .mockReturnValue(Promise.resolve(Buffer.from(expectedContent)));

    const content = await readFileAsynchronously('index.ts');

    expect(content).toBe(expectedContent);
  });
});
