import { describe, it, expect } from 'vitest';
import User from '@/models/user';
import Bank from '@/models/bank';
import BankAccount from '@/models/bank-account';
import TransactionService from '@/services/TransactionService';


describe('Banks', () => {
  it('has a bank class', () => {
    expect(Bank).toBeDefined();
  });

  it('can create a bank', () => {
    const bank = Bank.create();
    expect(bank.getId()).toBeDefined();
  });

  it('can create a bank account', () => {
    const bank = Bank.create();
    const bankAccount = bank.createAccount(100);
    expect(bankAccount.getId()).toBeDefined();
  });
});


describe('Users', () => {
  it('has a user class', () => {
    expect(User).toBeDefined();
  });

  it('can create a user', () => {
    const user = User.create('Firstname Lastname', []);
    expect(user).toBeDefined();
  });

  it('can create a user with accounts', () => {
    const bank = Bank.create();
    const bankAccount1Id = bank.createAccount(100).getId();
    const bankAccount2Id = bank.createAccount(200).getId();
    const bankAccount3Id = bank.createAccount(300).getId();

    const user = User.create('Firstname Lastname', [bankAccount1Id, bankAccount2Id, bankAccount3Id]);
    expect(user).toBeDefined();
  });
});

describe('Accounts', () => {
  it('has an account class', () => {
    expect(BankAccount).toBeDefined();
  });
});

describe('Transactions', () => {
  it('has a transaction service', () => {
    expect(TransactionService).toBeDefined();
  });
});
