import { idGenerator } from "@/utils/idgen";
import BankAccount from "./bank-account";

export default class Bank {
    private id: string;
    private customerIds: string[];
    private isNegativeAllowed: boolean;
    private bankAccounts: BankAccount[];

    // Gives an unique ID to the Bank created
    constructor(options?: {isNegativeAllowed?: boolean}){
        this.id = idGenerator();
        this.customerIds = [];
        this.bankAccounts = [];

        if(options == undefined){
            this.isNegativeAllowed = true
        }else{
            this.isNegativeAllowed = options.isNegativeAllowed;
        }
    }

    // Returns an instance of the class Bank
    static create(options?: {isNegativeAllowed?: boolean}): Bank{
        return new Bank();
    }

    // Returns the ID of the bank
    getId(): string{
        return this.id;
    }

    createAccount(initialBalance: number): BankAccount{
        const account = new BankAccount(initialBalance, this.id)
        this.customerIds.push(account.getId());
        this.bankAccounts.push(account)
        return account;
    }

    getAccount(accountId: string): BankAccount | null{
        let accountFound = false;
        for(let i = 0; i < this.customerIds.length; i++){
            if(accountId == this.customerIds[i]){
                accountFound = true;
                break;
            }
        }
        if(accountFound){
            for(let i = 0; i < this.bankAccounts.length; i++){
                if(this.bankAccounts[i].getId() == accountId){
                    return this.bankAccounts[i]
                }
            }
        }else{
            console.log(`Account doesn't exist.`)
            return null
        }
    }

    send(senderId: string, receiverId: string, amount: number){
        let accountFound = false;
        let senderAccount: BankAccount;
        let customerAccounts = [];

        for(let i = 0; i < this.customerIds.length; i++){
            if(senderId == this.customerIds[i]){
                accountFound = true
                break;
            }
        }

        if(accountFound){
            for(let i = 0; i < this.bankAccounts.length; i++){
                if(this.bankAccounts[i].getId() == senderId){
                    senderAccount = this.bankAccounts[i]
                }
            }
        }
    }
}