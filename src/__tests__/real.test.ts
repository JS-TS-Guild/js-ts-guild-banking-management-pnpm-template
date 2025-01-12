import { describe, beforeEach, it, expect } from 'vitest';
import { TestFactory } from './helpers/TestFactory';
import type { TestFixtures } from './helpers/TestFactory';

describe('Bank Transfer Tests', () => {
  let fixtures: TestFixtures;

  beforeEach(() => {
    fixtures = TestFactory.createFixtures();
  });

  it('should allow transfer between accounts', () => {
    const { bank, aliceUserId, bobUserId, aliceAccountId, bobAccountId } = fixtures;

    // Initial balances
    const aliceAccount = bank.getAccount(aliceAccountId);
    const bobAccount = bank.getAccount(bobAccountId);
    expect(aliceAccount.getBalance()).toBe(1000);
    expect(bobAccount.getBalance()).toBe(500);

    // Perform transfer
    bank.send(aliceUserId, bobUserId, 300);

    // Check final balances
    expect(aliceAccount.getBalance()).toBe(700);
    expect(bobAccount.getBalance()).toBe(800);
  });


  it('should not allow transfer with insufficient funds', () => {
    const { bank, aliceUserId, bobUserId } = fixtures;

    expect(() => {
      bank.send(aliceUserId, bobUserId, 2000);
    }).toThrow('Insufficient funds');
  });

  it('should allow transfer with negative balance', () => {
    const { bank, bankAllowsNegative, aliceUserId, bobUserId, aliceAccountAllowsNegativeId, bobAccountId } = fixtures;

    const aliceAccountAllowsNegative = bankAllowsNegative.getAccount(aliceAccountAllowsNegativeId);
    const bobBankId = bank.getId();
    const bobAccount = bank.getAccount(bobAccountId);

    expect(aliceAccountAllowsNegative.getBalance()).toBe(200);
    expect(bobAccount.getBalance()).toBe(500);

    bankAllowsNegative.send(aliceUserId, bobUserId, 500, bobBankId);

    expect(aliceAccountAllowsNegative.getBalance()).toBe(-300);
    expect(bobAccount.getBalance()).toBe(1000);
  });
});
