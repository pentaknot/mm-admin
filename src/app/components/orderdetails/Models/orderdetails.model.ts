export class Order {
    id: number;
    orderId: string;
    customerId: string;
    productId: string;
    orderNumber: string;
    quantity: number;
    total: string;
    hostIp: string;
    createdBy: string;
    creationDate: Date;
    updatedBy: string;
    updatedDate: Date;
    isActive: boolean;
    isDeleted: boolean;
}

export class OrderPageList {
   orderdetails: Array<any>;
    totalRecords: number;
}



