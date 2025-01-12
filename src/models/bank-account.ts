import { BankAccountId } from "@/types/Common";

export default class BankAccount {
    id:string
    private balance:number

    constructor(initialBalance: number){
        this.balance = initialBalance
        this.id = this.generateId();
    }

    private generateId(): BankAccountId {
        return Math.random().toString(36).substr(2, 9);
    }
    
    getId(): BankAccountId {
        return this.id;
    }
}