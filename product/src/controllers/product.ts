abstract class Product {

    protected ID: string;
    protected quantity: number;

    constructor(ID: string, quantity: number) {
        this.ID = ID;
        this.quantity = quantity;
    }

    abstract find(ID: string): Product;
}