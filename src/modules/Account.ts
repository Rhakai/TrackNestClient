import { Position } from "./Position";

export interface IAccount{
    accountName : string;
    positions : Position[];
}

export class Account implements IAccount {
    public accountName! : string;
    public positions! : Position[];

    constructor(account: IAccount) {
        this.accountName = account.accountName;
        this.positions = account.positions;
    }
}


