import Bank from "@/models/bank";
import User from "@/models/user";

export default class GlobalRegistry {

    private static userRegistry: {[userId: string]: User} = {};
    private static bankRegistry: {[bankId: string]: Bank} = {};

    // TO ADD AND GET USERS FROM GLOBAL REGISTRY
    static addUser(userId: string, user: User): void {
        if(this.userRegistry[userId]){
            throw new Error("User already exists")
        }else{
            this.userRegistry[userId] = user
        }
    }

    static getUser(userId: string): User | null{
        return this.userRegistry[userId] || null;
    }


    // TO ADD AND GET BANKS  FROM GLOBAL REGISTRY
    static addBank(bankId: string, bank:Bank){
        if(this.bankRegistry[bankId]){
            throw new Error("Bank Account already exists")
        }else{
            this.bankRegistry[bankId] = bank
        }
    }

    static getBank(bankId: string): Bank | null{
        return this.bankRegistry[bankId] || null;
    }

    static getBanks(){
        return this.bankRegistry;
    }


    static clear() {
        this.userRegistry = {};
    }
}


