export class Country {
    id: number;
    countryId: string;
    name: string;
    hostIp: string;
    createdBy: string;
    creationDate: Date;
    updatedBy: string;
    updatedDate: Date;
    isActive: boolean;
    isDeleted: boolean;
}

export class CountryPageList {
    country: Array<any>;
    totalRecords: number;
}



