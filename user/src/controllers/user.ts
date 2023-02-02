abstract class User {

    protected email: string;
    protected password: string;

    constructor(email: string) {
        this.email = email;
    }

    abstract find(email: string): User;
}