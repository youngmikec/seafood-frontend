import { User } from './index';

export interface Parcel {
    id?:               string;
    _id?:              string;
    name?:             string;
    code?:             string;
    quantity?:         number;
    mass?:             number;
    volume?:           number; 
    worth?:            number;
    category?:         string;
    distance?:         number;
    description?:      string;
    parcelImage?:      string;
    deliveryAddress?:  string;
    deliveryCoordinates?: number[];
    senderName?:          string;
    senderPhone?:         string;
    senderEmail?:         string;
    recipientName?:       string;
    recipientPhone?:      string;
    recipientEmail?:      string;
    pickupAddress?:       string;
    pickupCoordinates?:   number[];
    status?:              string;
    isParcelPaid?:        boolean;
    amountPayable?:       number;
    shippingFee?:         number;
    identification?:      string;
    depatureDate?:        Date; // Parcel Departure date
    expectedDate?:        Date; // Parcel Departure date
    remark?:              string;
    paymentMethod?:       string;
    paymentGateway?:      string;
    paymentStatus?:       string;
    pickupDate?:          Date;
    shippedDate?:         Date;
    deliveryDate?:        Date;
    confirmDate?:         Date;
    createdAt?:           Date;
    createdBy?:           User;
    updatedBy?:           User;
    deleted?:             number;
    deletedAt?:           Date;
    deletedBy?:           User;
}



export class Parcel { 
    id?:               string;
    _id?:              string;
    name?:             string;
    code?:             string;
    quantity?:         number;
    mass?:             number;
    volume?:           number; 
    worth?:            number;
    category?:         string;
    distance?:         number;
    description?:      string;
    parcelImage?:      string;
    deliveryAddress?:  string;
    deliveryCoordinates?: number[];
    senderName?:          string;
    senderPhone?:         string;
    senderEmail?:         string;
    recipientName?:       string;
    recipientPhone?:      string;
    recipientEmail?:      string;
    pickupAddress?:       string;
    pickupCoordinates?:   number[];
    status?:              string;
    isParcelPaid?:        boolean;
    amountPayable?:       number;
    shippingFee?:         number;
    identification?:      string;
    depatureDate?:        Date; // Parcel Departure date
    expectedDate?:        Date; // Parcel Departure date
    remark?:              string;
    paymentMethod?:       string;
    paymentGateway?:      string;
    paymentStatus?:       string;
    pickupDate?:          Date;
    shippedDate?:         Date;
    deliveryDate?:        Date;
    confirmDate?:         Date;
    createdAt?:           Date;
    createdBy?:           User;
    updatedBy?:           User;
    deleted?:             number;
    deletedAt?:           Date;
    deletedBy?:           User;

    constructor(fields: any){
        for(let f of fields){
            //@ts-ignore
            this[f] = fields[f];
        }
    }
}