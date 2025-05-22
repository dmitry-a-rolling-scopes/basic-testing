// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  let bankAccount: BankAccount;

  beforeEach(() => {
    bankAccount = getBankAccount(1);
  });

  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(1);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount.withdraw(2)).toThrow(
      new InsufficientFundsError(1),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const toBankAccount = getBankAccount(0);

    expect(() => bankAccount.transfer(2, toBankAccount)).toThrow(
      new InsufficientFundsError(1),
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount.transfer(1, bankAccount)).toThrow(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    expect(bankAccount.deposit(1).getBalance()).toBe(2);
  });

  test('should withdraw money', () => {
    expect(bankAccount.withdraw(1).getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    const toBankAccount = getBankAccount(0);

    expect(toBankAccount.getBalance()).toBe(0);
    expect(bankAccount.transfer(1, toBankAccount).getBalance()).toBe(0);
    expect(toBankAccount.getBalance()).toBe(1);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const lodash = jest.requireActual('lodash');

    lodash.random = jest.fn(() => 1);

    expect(await bankAccount.fetchBalance()).toEqual(expect.any(Number));

    jest.restoreAllMocks();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const expectedBalance = 100;
    const lodash = jest.requireActual('lodash');

    lodash.random = jest.fn(() => expectedBalance);

    expect(bankAccount.getBalance()).toBe(1);
    await expect(bankAccount.synchronizeBalance()).resolves.not.toThrow();
    expect(bankAccount.getBalance()).toBe(expectedBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const lodash = jest.requireActual('lodash');

    lodash.random = jest.fn(() => 0);

    await expect(bankAccount.synchronizeBalance()).rejects.toBeInstanceOf(
      SynchronizationFailedError,
    );

    jest.restoreAllMocks();
  });
});
