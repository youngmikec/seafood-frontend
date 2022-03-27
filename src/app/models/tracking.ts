import { Shipment } from "./shipment";

interface TrackingDetail {
    status?:           string;
    currentLocation?:  {address: string, coordinates: Array<number>}
}

interface TrackingResult {
    id?:                string;
    deleted?:           boolean;
    trackingCode?:      string;
    createdBy?:         string;
    code?:              string;
    shipment?:          Shipment;
    createdAt?:         Date;
    updatedAt?:         Date;
}

export interface Tracking {
    trackingDetail?: TrackingDetail;
    result?: TrackingResult;
}

export class Tracking {
    trackingDetail?: TrackingDetail;
    result?: TrackingResult;

    constructor(fields: any){
        for(let f of fields){
            Object.assign(this, fields[f]);
        }
    }
}