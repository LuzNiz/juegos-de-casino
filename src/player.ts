export class Player {
    private firstName: string;
    private lastName: string;
    private email: string;
    private tokens: number;

    public constructor(firstName: string, lastName: string, edad: number, email: string){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.tokens = 50;
    }
    //Getters and setters
    public getFirstName(): string{
        return this.firstName;
    }
    public setFirstName(firstName: string): void{
        this.firstName = firstName;
    }

    public getLastName(): string{
        return this.lastName;
    }
    public setLastName(lastName: string): void{
        this.lastName = lastName;
    }

    public getEmail(): string{
        return this.email;
    }
    public setEmail(email: string): void{
        this.email = email;
    }

    public getTokens(): number{
        return this.tokens;
    }
    public setTokens(tokens: number): void{
        this.tokens = tokens;
    }

    public showData(): Player{
        return this;
    }
}