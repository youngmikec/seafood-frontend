import { Package, User } from "./index";

export interface Location {
    address?:    string;
    coordinates?: Array<any>;
}

export interface Shipment {
    id?:                 string;
    _id?:                string;
    code?:               string;
    packages?:           Array<Package>;
    locationFrom?:       Location;
    destination?:        Location;
    currentLocation?:    Location;
    courierName?:        string; 
    courierPhone?:       string; 
    vehicleType?:        string; 
    vehicleDetail?:      string; 
    isVehicleFull?:      boolean;
    remark?:             string;
    status?:             "LOADING" | "DEPARTED" | "ARRIVED";
    departureDate?:      Date;
    expectedDate?:       Date;
    createdAt?:          Date;
    createdBy?:          User;
    updatedBy?:          User;
    deleted?:            boolean;
    deletedAt?:          Date;
    deletedBy?:          User;
}

export class Shipment {
    id?:                 string;
    _id?:                string;
    code?:               string;
    packages?:           Array<Package>;
    locationFrom?:       Location;
    destination?:        Location;
    currentLocation?:    Location;
    courierName?:        string; 
    courierPhone?:       string; 
    vehicleType?:        string; 
    vehicleDetail?:      string; 
    isVehicleFull?:      boolean;
    remark?:             string;
    status?:             "LOADING" | "DEPARTED" | "ARRIVED";
    departureDate?:      Date;
    expectedDate?:       Date;
    createdAt?:          Date;
    createdBy?:          User;
    updatedBy?:          User;
    deleted?:            boolean;
    deletedAt?:          Date;
    deletedBy?:          User;

    constructor(fields: any){
        // Object.assign(this, fields);
        for(let f of fields){
            //@ts-ignore
            this[f] = fields[f];
        }   
    }
}