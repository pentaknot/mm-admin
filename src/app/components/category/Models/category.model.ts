export class Category {
    id: number;
    categoryId: string;
    parentId: string;
    name: string;
    hostIp: string;
    createdBy: string;
    creationDate: Date;
    updatedBy: string;
    updatedDate: Date;
    isActive: boolean;
    isDeleted: boolean;
}

export class CategoryPageList {
    category: Array<any>;
    totalRecords: number;
}



