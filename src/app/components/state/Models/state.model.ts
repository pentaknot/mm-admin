export class State {
    id: number;
    stateId: string;
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

export class StatePageList {
    state: Array<any>;
    totalRecords: number;
}



