
export interface IPosition {
    assetTicket: string;
    amountOfAssets: number;
    cost: number;
}

export class Position implements IPosition{
    public assetTicket: string;
    public amountOfAssets: number;
    public cost: number;

    constructor(position : IPosition){
        this.assetTicket = position.assetTicket;
        this.amountOfAssets = position.amountOfAssets;
        this.cost = position.cost;
    }
}
