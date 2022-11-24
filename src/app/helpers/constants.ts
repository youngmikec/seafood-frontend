export const FREEXIT = {
  ADMIN: "5a51bc91860d8b5ba000a000",
  USERID: "5a51bc91860d8b5ba0001000",
  USERID2: "5a51bc91860d8b5ba0002000",
  WALLET_DEBIT: "1234ABCDEF",
  WALLET_CREDIT: "1000ABCDEF",
  WALLET_AMOUNT: 1_000_000_000_000,
  START_DATE: "2021-04-01",
};

export const TRANSACTION = {
  DEPOSIT: "D", // Crediting by Merchant or Customer
  WITHDRAW: "W", // Cashing out by Merchant or Customer
  TRANSFER: "T", // Spending within Ewallet System between Mechant and Cutsomer
};

export const COVERAGE = {
  "1": "GLOBAL",
  "2": "COUNTRY",
  "3": "REGION",
};

export const PAYMENT = {
  GATEWAY: {
    STRIP: "STRIP",
    INTERSWITCH: "INTERSWITCH",
    UNIONBANK: "UNIONBANK",
    PAYSTACK: "PAYSTACK",
    STRIPE: "STRIPE",
    PAYPAL: "PAYPAL",
    GOOGLE_WALLET: "GOOGLE_WALLET",
    FREEXIT_WALLET: "FREEXIT_WALLET",
  },
  METHOD: {
    GATEWAY: "GATEWAY",
    POS: "POS",
    CASH: "CASH",
    CHEQUE: "CHEQUE",
    TRANSFER: "TRANSFER",
    USSD: "USSD",
    WALLET: "WALLET",
  },
  STATUS: {
    PENDING: "PENDING",
    SUCCESSFUL: "SUCCESSFUL",
    FAIL: "FAIL",
  },
};

export const USER_ROLE = {
  "1": "OWNER",
  "2": "ADMIN",
  "3": "SUPPORT",
  "4": "USER",
};

export const categories: string[] = [
  "Seafood",
  "Tuber",
  "Egusi", 
  "Ogono",
  "Ukwa",
  "Ofo/achi",
  "Rice",
  "Beans",
  "Garri",
  "Groundnut oil",
  "Stock fish",
  "Dryfish",
  "Yam",
  "Cocoyam", 
  "Casava",
  "Pepper",
  "Red onions",
  "Tomatoes",
]

export const USER_TYPE = {
  SENDER: "SENDER",
  DISPATCHER: "DISPATCHER",
  ADMIN: "ADMIN",
};

export const SCHEDULE = {
  PENDING: 1,
  LOADING: 2,
  TRANSIT: 3,
};

export const ACCESS_LEVEL = {
  BLOCKED:    0,
  LOGIN:      1,
  READ:       2,
  CREATE:     3,
  UPDATE:     4,
  DELETE:     5,
  ASSIGNMENT: 6,
  SCHEDULE:   7,
  TRANSFER:   8,
  WITHDRAW:   9,
};

export const ASSIGNMENT_STATUS = {
  CANCELLED: 0,
  PENDING: 1,
  ASSIGNED: 2,
  ACCEPTED: 3,
  COLLECTION: 4,
  DECLINED: 5,
  DISPATCHED: 6,
  DELIVERED: 7,
  CONFIRMED: 8,
  EXPIRED: 9,
}

export const PARCEL_STATUS =  {
  CANCELLED: 0,
  PENDING: 1,
  CHECKOUT: 2,
  CHARGED: 3,
  PACKAGED: 4,    
  ASSIGNED: 5,
  ACCEPTED: 6,
  COLLECTION: 7,
  DECLINED: 8,
  DISPATCHED: 9,
  SHIPPED: 10,
  DELIVERED: 11,
  CONFIRMED: 11,
}

export const VEHICLE_TYPES = [
    "BUS",
    "CAR",
    "TAXI",
    "KEKE",
    "BIKE",
    "TRUCK",
    "TRAILER",
    "AIRCRAFT",
    "SHIP",
    "BOAT",
]

export const EMAIL = {
  ADMIN: "freexittechnologies@gmail.com",
  SENDER: "sender@freexitnow.com",
  DISPATCHER: "dispatcher@freexitnow.com",
  CONTACT: "contact@freexitnow.com",
  NO_REPLY: "no-reply@freexitnow.com",
};

export const GENDER = {
  MALE: "M",
  FEMALE: "F",
  OTHER: "O",
};

export const BUCKET = {
  PARCEL: "parcel",
  BLOG: "blog",
  PROFILE: "profile",
  VEHICLE: "vehicle",
  CATEGORY: "category",
};

export const DATABASE = {
  ERP_VERSION: 1,
  OBJECT_ID_REGEX: /^[0-9a-fA-F]{24}$/,
  PRELOAD_TABLE_DATA: { TRUE: true, FALSE: false, DEFAULT: false },
  RECORD_STATUS: {
    REJECTED: 0,
    PENDING: 1,
    APPROVED: 2,
    AUDITED: 3,
    CLOSED: 4,
  },
  BASE_ID: {
    COUNTRY: "5c51bc91860d8bab00000001",
    REGION: "5c51bc91860d8bbc00000001",
  },
  OPTIONS: {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    autoIndex: true,
    minimize: false,
    versionKey: false,
    toJSON: {
      virtuals: true,
      // eslint-disable-next-line object-shorthand
      transform: function (doc: any, ret: {_id: string, id: string, updated_at: any, created_at: any, __v: any}) {
        ret.id = ret._id;
        // ret.createdAt = ret.created_at;
        // ret.updatedAt = ret.updated_at;
        //@ts-ignore
        delete ret._id;
        delete ret.updated_at;
        delete ret.created_at;
        delete ret.__v;
      },
    },
    toObject: { virtuals: true },
  },
};

export const ENTITY = {
  ASSIGNMENT: "Assignment",
  BANK: "Bank",
  CATEGORY: "Category",
  COUNTRY: "Country",
  DEPOSIT: "Deposit",
  LIEN: "Lien",
  MAIL: "Mail",
  MEDIA: "Media",
  NOTIFICATION: "Notification",
  OTP: "Otp",
  PARCEL: "Parcel",
  RATING: "Rating",
  REGION: "Region",
  REPORT: "Report",
  SCHEDULE: "Schedule",
  SETTING: "Setting",
  SMS: "Sms",
  TERMINAL: "Terminal",
  TICKET: "Ticket",
  TRACK: "Track",
  TRANSACTION: "Transaction",
  TRANSFER: "Transfer",
  UPGRADE: "Upgrade",
  USER: "User",
  VERHICLE: "Verhicle",
  WITHDRAW: "Withdraw",
}
export const JWT = {
  saltRounds: 2,
  jwtSecret: "Moi-moiSoupe-it`s-a_dragonEGG-secret",
  tokenExpireTime: "72h",
};

export const SMS = {
  FREEXIT_SMS_SENDER: "+1323649 6765",
};

export const API = {
  URL: "https://seafood.com",
};

export const INPUT_TYPE = {
  TEXT: "TEXT",
  TEXTAREA: "TEXTAREA",
  DROPDOWN: "DROPDOWN",
  FILE: "FILE",
  DATETIME: "DATETIME",
  LOCATION: "LOCATION",
  SELECTLIST: "SELECTLIST",
  RADIOBUTTON: "RADIOBUTTON",
  CHECKBOXES: "CHECKBOXES",
  DATE: "DATE",
  TIME: "TIME",
  NUMBER: "NUMBER",
};

export const ISSUE_PRIORITY = {
  EMERGENCY: "P1",
  HIGH: "P2",
  NORMAL: "P3",
  LOW: "P4",
};

export const ASSIGNMENT = {
  STATUS: {
    CANCELLED: 0,
    PENDING: 1,
    ASSIGNED: 2,
    ACCEPTED: 3,
    COLLECTION: 4,
    DECLINED: 5,
    DISPATCHED: 6,
    DELIVERED: 7,
    CONFIRMED: 8,
    EXPIRED: 9,
  },
  TYPE: {
    SYSTEM: 1,
    ADMIN: 2,
    SENDER: 3,
    DISPATCHER: 4,
  },
};

export const PARCEL = {
  STATUS: {
    CANCELLED: 0,
    PENDING: 1,
    CHECKOUT: 2,
    CHARGED: 3,
    PACKAGED: 4,  // UNASSIGNED   
    ASSIGNED: 5,
    ACCEPTED: 6,
    COLLECTION: 7,
    DECLINED: 8,
    DISPATCHED: 9,
    SHIPPED: 10,
    DELIVERED: 11,
    CONFIRMED: 11,
  },
  FRAGILITY: { ROBUST: "ROBUST", FRAGILE: "FRAGILE" },
  PERISHABILITY: { NONPERISHABLE: "NONPERISHABLE", PERISHABLE: "PERISHABLE" },
  COMBUSTIBILITY: {
    NONCOMBUSTIBLE: "NONCOMBUSTIBLE",
    COMBUSTIBLE: "COMBUSTIBLE",
  },
  ODIFEROUSNESS: { ODOROUS: "ODOROUS", ODORLESS: "ODORLESS" },
  SOLIDITY: { SOLID: "SOLID", LIQUID: "LIQUID" },
  UNIQUENESS: { ORDINARY: "ORDINARY", EXTRAORDINARY: "EXTRAORDINARY" },
  MAX_MASS: 9_000_000,
  MAX_VOLUME: 9_000_000,
  MAX_DISTANCE: 50_000,
  MAX_WORTH: 9_000_000,
  MAX_CHARGE: 9_000_000_000,
  MIN_CHARGE: 1_000,
};

export const VEHICLE = {
  TYPE: {
    BUS: "BUS",
    CAR: "CAR",
    TAXI: "TAXI",
    KEKE: "KEKE",
    BIKE: "BIKE",
    JEEP: "JEEP",
    TRUCK: "TRUCK",
    TRAILER: "TRAILER",
    AIRCRAFT: "AIRCRAFT",
    SHIP: "SHIP",
    BOAT: "BOAT",
  },
  MAKE: {
    TOYOTA: "TOYOTA",
    UGAMA: "UGAMA",
    MEIYER: "MEIYER",
    SIENNA: "SIENNA",
    KINGO: "KINGO",
  },
};

export const OFFICE_LOCATIONS = {
  locations: [
    {
      country: "Nigeria",
      state: "Enugu State",
      offices: [
        {
          name: "Trans-Ekulu",
          address: "No 32 Nowas Trans-Ekulu Enugu East Enugu state Nigeria."
        },
        {
          name: "Ziks Avenue",
          address: "No 104b Zik's Avenue Uwani Enugu state Nigeria."
        },
        {
          name: "New Haven",
          address: "No 69 Chime New Haven Enugu state Nigeria."
        },
      ]
    },
    {
      country: "Nigeria",
      state: "Imo State",
      offices: [
        {
          name: "Wethedral",
          address: "No 32 Wethedral off Cherobin junction Imo state Nigeria."
        },
        {
          name: "Okigwe Road",
          address: "Bank Road Okigwe Road Imo state Nigeria."
        },
      ]
    },
    {
      country: "United States of America",
      state: "Alaska",
      offices: [
        {
          name: "Ketchikan",
          address: "Ketchikan Alaska USA."
        },
        {
          name: "Healdsburg CA",
          address: "Healdsburg CA Alaska USA."
        },
      ]
    },
  ]
}