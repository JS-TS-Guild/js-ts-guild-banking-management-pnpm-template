import BankAccount from "./bank-account";

export default class Bank {
    constructor(){
        let bankId;
    }

    static create(options?: {isNegativeAllowed: boolean}): Bank{
        return new Bank()
    }

    getId(){
        return 1;
    }

    
    createAccount(initialBalance: number): BankAccount {
        return new BankAccount(initialBalance);
    }
}