import { idGenerator } from "@/utils/idgen";

export default class User {
  private userName: string;
  private bankAccounts: string[];
  private userId: string;

  constructor(username: string, bankAccounts: string[]){
    this.userName = username;
    this.bankAccounts = [...bankAccounts];
    this.userId = idGenerator();
  }

  static create(userName: string, bankAccounts: string[]): User{
    return new User(userName, bankAccounts)
  }

  getId(){
    return this.userId;
  }
}