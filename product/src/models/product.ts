import { ObjectId } from "mongodb";

export default class Product {
  constructor(
    public name: string,
    public description: string,
    public category: string,
    public price: number,
    public imageFileName: string,
    public inStockQuantity: number,
    public timeAdded: Date,

    public id?: ObjectId
  ) {}
}
