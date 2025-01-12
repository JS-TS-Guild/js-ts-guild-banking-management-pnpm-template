import { UserId, BankAccountId } from '@/types/Common';

export default class User {
  private id: UserId;
  private name: string;
  private accountIds: BankAccountId[];

  constructor(name: string, accountIds: BankAccountId[]) {
    this.id = this.generateId();
    this.name = name;
    this.accountIds = accountIds;
  }

  static create(name: string, accountIds: BankAccountId[]): User {
    return new User(name, accountIds);
  }

  private generateId(): UserId {
    return Math.random().toString(36).substr(2, 9);
  }

  getId(): UserId {
    return this.id;
  }

  getAccountIds(): BankAccountId[] {
    return this.accountIds;
  }
}