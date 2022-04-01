import { PACKAGE_STATUS } from "./enum";
import { User } from "./index";

export interface Package {
    id?:                  string;
    _id?:                 string;
    code?:                string; 
    name?:                string;
    parcels?:             Array<string>;
    amountPayable?:       number;
    totalAmount?:         number;
    totalShipingFee?:     number;
    senderName?:          string;
    senderPhone?:         string;
    recipientName?:       string;
    recipientPhone?:      string;
    pickupAddress?:       string;
    pickupCoordinates?:   Array<number>;
    deliveryAddress?:     string;
    deliveryCoordinates?: Array<number>;
    status?:              PACKAGE_STATUS;
    remark?:              string;
    transactionRef?:      string;
    isCheckedOut?:        boolean;
    paymentMethod?:       "CASH" | "TRANSFER" | "GATEWAY" | "WALLET";
    paymentGateway?:      "Paystack" | "Flutterwave" | "Paypal";
    paymentStatus?:       "SUCCESS" | "FAIL" | "PENDING";
    pickupDate?:          Date;
    deliveryDate?:        Date;
    createdAt?:           Date;
    updatedAt?:           Date;
    createdBy?:           User;
    updatedBy?:           User;
    deleted?:             boolean;
    deletedAt?:           Date;
    deletedBy?:           User;
}

export class Package {
    id?:                  string;
    _id?:                 string;
    code?:                string; 
    name?:                string;
    parcels?:             Array<string>;
    amountPayable?:       number;
    totalAmount?:         number;
    totalShipingFee?:     number;
    senderName?:          string;
    senderPhone?:         string;
    recipientName?:       string;
    recipientPhone?:      string;
    pickupAddress?:       string;
    pickupCoordinates?:   Array<number>;
    deliveryAddress?:     string;
    deliveryCoordinates?: Array<number>;
    status?:              PACKAGE_STATUS;
    remark?:              string;
    transactionRef?:      string;
    isCheckedOut?:        boolean;
    paymentMethod?:       "CASH" | "TRANSFER" | "GATEWAY" | "WALLET";
    paymentGateway?:      "Paystack" | "Flutterwave" | "Paypal";
    paymentStatus?:       "SUCCESS" | "FAIL" | "PENDING";
    pickupDate?:          Date;
    deliveryDate?:        Date;
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