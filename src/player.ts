export class Player {
    private firstName: string;
    private lastName: string;
    private availableMoney: number;

    public constructor(firstName: string, lastName: string){
        this.firstName = firstName;
        this.lastName = lastName;
        this.availableMoney = 0;
    }
    //GETTERS AND SETTERS
    public getFirstName(): string{ return this.firstName};
    public setFirstName(firstName: string): void{ this.firstName = firstName};

    public getLastName(): string{ return this.lastName};
    public setLastName(lastName: string): void{this.lastName = lastName};

    public getvailableMoney(): number{return this.availableMoney};
    public setAvailableMoney(money: number): void{this.availableMoney = money};

    //METODO QUE RETORNA AL JUGADOR
    public showData(): Player{return this}; //¿Necesario?
}