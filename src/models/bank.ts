import BankAccount from './bank-account';

export default class Bank {
  constructor() {
    let bankId;
  }

  static create(options?: { isNegativeAllowed?: boolean }): Bank {
    return new Bank();
  }

  getId() {
    return 1;
  }

  createAccount(initialBalance: number): BankAccount {
    return new BankAccount(initialBalance);
  }

  getAccount() {}

  send(
    senderUserId: string,
    receiverUserId: string,
    amount: number,
    bankId?: number
  ): void {
    // Implementation of the send method
  }
}
