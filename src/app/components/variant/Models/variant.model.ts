export class variant {
    id: number;
    variantId: string;
    productId: string;
    sampleImage: string;    
    colorName: string;
    hostIp: string;
    createdBy: string;
    creationDate: Date;
    updatedBy: string;
    updatedDate: Date;
    isActive: boolean;
    isDeleted: boolean;
}

export class VariantPageList {
    variant: Array<any>;
    totalRecords: number;
}

export class VariantImageRel {
    id: number;
    variantId: string;
    images: Array<string>;
    displayOrder: number;
    hostIp: string;
    createdBy: string;
    creationDate: Date;
    updatedBy: string;
    updatedDate: Date;
    isActive: boolean;
    isDeleted: boolean;
}

export class ImageList {
    fileName: string;
    // fileType: string;
    // fileSize: string;
}



