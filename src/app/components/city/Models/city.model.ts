export class City {
    id: number;
    cityId: string;
    stateId: string;
    name: string;
    hostIp: string;
    createdBy: string;
    creationDate: Date;
    updatedBy: string;
    updatedDate: Date;
    isActive: boolean;
    isDeleted: boolean;
}

export class CityPageList {
    city: Array<any>;
    totalRecords: number;
}



