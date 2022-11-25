import { DEPOSIT_STATUS, DEPOSIT_TRXNSTATUS } from "./enum";
import { User } from "./user";

export interface Deposit {
    id?:                  string;
    _id?:                 string;
    user?:                 User;
    code?:                  string;
    pin?:                  string;
    amount?:               number;
    depositorBank?:        string;
    depositorAcctName?:    string;
    depositorAcctNum?:     string;
    transactionStatus?:    DEPOSIT_TRXNSTATUS;
    status?:               DEPOSIT_STATUS;
    createdAt?:           Date;
    updatedAt?:           Date;
    createdBy?:           User;
    updatedBy?:           User;
    deleted?:             boolean;
    deletedAt?:           Date;
    deletedBy?:           User;
}

export class Deposit {
    id?:                  string;
    _id?:                 string;
    user?:                 User;
    code?:                  string;
    pin?:                  string;
    amount?:               number;
    depositorBank?:        string;
    depositorAcctName?:    string;
    depositorAcctNum?:     string;
    transactionStatus?:    DEPOSIT_TRXNSTATUS;
    status?:               DEPOSIT_STATUS;
    createdAt?:           Date;
    updatedAt?:           Date;
    createdBy?:           User;
    updatedBy?:           User;
    deleted?:             boolean;
    deletedAt?:           Date;
    deletedBy?:           User;

    constructor(fields: any){
        for(let f of fields){
            //@ts-ignore
            this[f] = fields[f];
        }
    }
}