import GlobalRegistry from "@/services/GlobalRegistry";
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
    const user =  new User(userName, bankAccounts)
    GlobalRegistry.addUser(user.getId(), user)
    return user
  }

  getId(){
    return this.userId;
  }

  static getUser(userId: string){
    return GlobalRegistry.getUser(userId)
  }

  getAccounts(){
    return this.bankAccounts;
  }
}