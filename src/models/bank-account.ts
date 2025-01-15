import GlobalRegistry from "@/services/GlobalRegistry";
import { idGenerator } from "@/utils/idgen"

export default class BankAccount {
    private id: string
    private bankId: string
    private balance: number

    constructor(initialBalance: number, bankId: string){
        this.id = idGenerator();
        this.bankId = bankId;
        this.balance = initialBalance;
    }

    getId(){
        return this.id;
    }

    getBankId(){
        return this.bankId;
    }

    getBalance(){
        return this.balance;
    }

    credit(amount: number){
        this.balance += amount;
    }

    debit(amount: number){
        this.balance -= amount

    }
}