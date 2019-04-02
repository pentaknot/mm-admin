export class Product {
    id: number;
    productId: string;
    categoryId: string;
    sku: string;
    name: string;
    description: string;
    basePrice: string;
    stockQuantity: number; 
    minimumQuantity: number;
    hostIp: string;
    createdBy: string;
    creationDate: Date;
    updatedBy: string;
    updatedDate: Date;
    isActive: boolean;
    isDeleted: boolean;
}

export class ProductPageList {
    product: Array<any>;
    totalRecords: number;
}



