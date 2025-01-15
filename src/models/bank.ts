import { idGenerator } from "@/utils/idgen";
import BankAccount from "./bank-account";
import User from "./user";
import GlobalRegistry from "@/services/GlobalRegistry";

export default class Bank {
    private id: string;
    private isNegativeAllowed: boolean;
    private bankAccounts:{};

    // Gives an unique ID to the Bank created
    constructor(options?: {isNegativeAllowed?: boolean}){
        this.id = idGenerator();
        this.bankAccounts = {};

        if(options == undefined){
            this.isNegativeAllowed = false
        }else{
            this.isNegativeAllowed = options.isNegativeAllowed;
        }
    }

    // Returns an instance of the class Bank
    static create(options?: {isNegativeAllowed?: boolean}): Bank{
        const bank = new Bank(options);
        GlobalRegistry.addBank(bank.getId(), bank)
        return bank;
    }

    // Returns the ID of the bank
    getId(): string{
        return this.id;
    }

    getBankAllowsNegative(): boolean{
        return this.isNegativeAllowed;
    }

    createAccount(initialBalance: number): BankAccount{
        const account = new BankAccount(initialBalance, this.id)
        this.bankAccounts[account.getId()] = account;
        
        return account;
    }

    getAccount(accountId: string): BankAccount | null{
        if (this.bankAccounts.hasOwnProperty(accountId)) {
            return this.bankAccounts[accountId];
        } else {
            console.log(`Account doesn't exist.`);
            return null;
        }
    }

    // WIP: This is still in WIP and not complete
    send(senderUserId: string, receiverUserId: string, amount: number, receiverBankId?: string){
        let allBanks = GlobalRegistry.getBanks();
        let transactionStatus:boolean;

        let sender: User = GlobalRegistry.getUser(senderUserId)
        let senderBankAccount: BankAccount;
        let senderAccountIds = sender.getAccounts();

        let receiver: User = GlobalRegistry.getUser(receiverUserId)
        let receiverBankAccount: BankAccount;
        let receiverAccountIds = receiver.getAccounts();
        console.log(this.bankAccounts)
        console.log("\n\nAll Banks: \n",GlobalRegistry.getBanks(),"\n")

        console.log("Sender: ",sender,)
        console.log("Sender Account Ids: ", sender.getAccounts(),"\n")

        console.log("Receiver: ",receiver)
        
        // Fetching Receiver Bank Account
        if(receiverBankId){
            console.log("Receiver Account Ids: ", receiverAccountIds,"\n")

            let bank = allBanks[receiverBankId]
            console.log("Receiver Bank: ",bank)

            for(let i = 0; i < receiverAccountIds.length; i++){
                receiverBankAccount = bank.getAccount(receiverAccountIds[i])
                if(receiverBankAccount !== null){
                    break;
                }
                console.log("\n\nReceiver Bank Account: ",receiverBankAccount)
            }
        }else{
            console.log("Receiver Account Ids: ", receiverAccountIds,"\n")

            for(const bankId in allBanks){
                const bank = allBanks[bankId]
                let receiverAccountFound = false;
                for(let i = 0; i < receiverAccountIds.length; i++){
                    receiverBankAccount = bank.getAccount(receiverAccountIds[i])
                    if(receiverBankAccount !== null){
                        receiverAccountFound = true
                        break;
                    }
                }
                if(receiverAccountFound){
                    break
                }
            }
        }
        
        //Fetching Sender Bank Account
        for(const accountId of senderAccountIds){
            senderBankAccount = this.getAccount(accountId)
            let bankAllowsNegative = this.getBankAllowsNegative()
            if(senderBankAccount == null){
                continue
            }else{
                if(!bankAllowsNegative && senderBankAccount.getBalance() >= amount){
                    senderBankAccount.debit(amount)
                    receiverBankAccount.credit(amount)
                    transactionStatus = true
                    break
                }else if(bankAllowsNegative){
                    senderBankAccount.debit(amount)
                    receiverBankAccount.credit(amount)
                    transactionStatus = true
                    break;
                }
            }
        }
        
        if(!transactionStatus){
            throw new Error("Insufficient funds")
        }
    }
}