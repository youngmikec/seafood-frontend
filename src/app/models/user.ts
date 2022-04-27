import { Gender, UserType } from './enum';

export interface User {
   id?:               string;
   _id?:              string;
   title?:            string;
   userType?:         UserType; 
   surname?:          string;
   firstName?:        string;
   middleName?:       string;
   lastName?:         string;
   gender?:           Gender;
   birthDate?:        Date;
   address?:          string;
   location?:         any;
   coverage?:         number;
   country?:          string;
   state?:            string;
   county?:           string;
   password?:         string;
   email?:            string;
   phone?:            string;
   phone2?:           string;
   image?:            string;
   kin?:              string;
   kinPhone?:         string;
   kinAddress?:       string;
   wallet?:           string | number;
   walletPin?:        string;
   balance?:          number;
 
   approvedBy?:       User;
   approvedDate?:     Date;
   verifiedBy?:       User;
   verifiedDate?:     Date;
   disengagedBy?:     User;
   disengagedDate?:   Date;
   otp?:              string;
   otpCount?:         number;
   otpAccess?:        number;
   otpTimeout?:       Date;
   accessLevel?:      number;
   isEmailVerified?:  boolean;
   emailNotification?: boolean;
   smsNotification?:   boolean;
   lastLogin?:         Date;
   currentLogin?:      Date;
   lastIp?:            string;
   currentIp?:         string;
   createdBy?:         User;
   updatedBy?:         User;
   deleted?:           number;
   deletedAt?:         Date;
   deletedBy?:         User;
}


export class User {
   id?:               string;
   _id?:              string;
   title?:            string;
   userType?:         UserType; 
   surname?:          string;
   firstName?:        string;
   middleName?:       string;
   lastName?:         string;
   gender?:           Gender;
   birthDate?:        Date;
   address?:          string;
   location?:         any;
   coverage?:         number;
   country?:          string;
   state?:            string;
   county?:           string;
   password?:         string;
   email?:            string;
   phone?:            string;
   phone2?:           string;
   image?:            string;
   kin?:              string;
   kinPhone?:         string;
   kinAddress?:       string;
   wallet?:           string | number;
   walletPin?:        string;
   balance?:          number;

   approvedBy?:       User;
   approvedDate?:     Date;
   verifiedBy?:       User;
   verifiedDate?:     Date;
   disengagedBy?:     User;
   disengagedDate?:   Date;
   otp?:              string;
   otpCount?:         number;
   otpAccess?:        number;
   otpTimeout?:       Date;
   accessLevel?:      number;
   isEmailVerified?:  boolean;
   emailNotification?: boolean;
   smsNotification?:   boolean;
   lastLogin?:         Date;
   currentLogin?:      Date;
   lastIp?:            string;
   currentIp?:         string;
   createdBy?:         User;
   updatedBy?:         User;
   deleted?:           number;
   deletedAt?:         Date;
   deletedBy?:         User;

   constructor(fields: any){
       for(let f of fields){
           //@ts-ignore
           this[f] = fields[f];
       }
   }
}