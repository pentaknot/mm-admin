export class Attribute {
    id: number;
    attributeId: string;
    name: string;
    hostIp: string;
    createdBy: string;
    creationDate: Date;
    updatedBy: string;
    updatedDate: Date;
    isActive: boolean;
    isDeleted: boolean;
}

export class AttributePageList {
   attribute: Array<any>;
    totalRecords: number;
}



