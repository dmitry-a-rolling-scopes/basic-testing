// Uncomment the code below and write your tests
import { Action, simpleCalculator } from './index';

const testCases = [
  // should add two numbers
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  // continue cases for other actions

  // should subtract two numbers
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 2, b: 3, action: Action.Subtract, expected: -1 },
  { a: -1, b: 2, action: Action.Subtract, expected: -3 },

  // should multiply two numbers
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 0, b: 1, action: Action.Multiply, expected: 0 },
  { a: -1, b: 2, action: Action.Multiply, expected: -2 },

  // should divide two numbers
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 6, b: -3, action: Action.Divide, expected: -2 },
  { a: 0, b: 1, action: Action.Divide, expected: 0 },
  { a: 1, b: 0, action: Action.Divide, expected: Infinity },

  // should exponentiate two numbers
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: -2, b: 3, action: Action.Exponentiate, expected: -8 },
  { a: 0, b: 3, action: Action.Exponentiate, expected: 0 },

  // should return null for invalid action
  { a: 1, b: 2, action: 'invalid', expected: null },
  { a: 1, b: 2, action: 0, expected: null },

  // should return null for invalid arguments
  { a: 1, b: 'invalid', action: Action.Add, expected: null },
  { a: 'invalid', b: 2, action: Action.Add, expected: null },
];

type TestCase = {
  a: unknown;
  b: unknown;
  action: unknown;
  expected: unknown;
};

describe('simpleCalculator', () => {
  it.each(testCases)('$a $action $b = $expected', (testCase: TestCase) => {
    const expected = testCase.expected;
    const result = simpleCalculator({
      a: testCase.a,
      b: testCase.b,
      action: testCase.action,
    });

    if (expected === null) {
      return expect(result).toBeNull();
    }

    expect(result).toBe(testCase.expected);
  });
});
