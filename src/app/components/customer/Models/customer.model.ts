export class Customer {
    id: number;
    customerId: string;
    cityId: string;
    stateId: string;
    countryId: string;
    name: string;
    email: string;
    phoneNumber: string;
    passwordHash: string;
    shippingAddress: string;
    billingAddress: string;
    pincode: number;
    hostIp: string;
    createdBy: string;
    creationDate: Date;
    updatedBy: string;
    updatedDate: Date;
    isActive: boolean;
    isDeleted: boolean;
}

export class CustomerPageList {
   customer: Array<any>;
    totalRecords: number;
}



