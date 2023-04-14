export class Player {
    private name;
    private surname;
    private age;
    private mail;
    private tokens;

    constructor(pName: string, pSurname: string, pAge: number, pMail: string) {
        this.name = pName
        this.surname = pSurname
        this.age = pAge
        this.mail = pMail
        this.tokens = 50

    }

    public getName(): string {
        return this.name;
    }
    public setName(pName: string): void {
        this.name = pName;
    }

    public getSurname(): string {
        return this.surname;
    }
    public setSurname(pSurname: string): void {
        this.surname = pSurname;


    } public getAge(): number {
        return this.age;
    }
    public setAge(pAge: number): void {
        this.age = pAge;
    } 
    public getMail(): string {
        return this.mail;
    }
    public setMail(pMail: string): void {
        this.mail = pMail;
    }
    public getTokens(): number {
        return this.tokens;
    }
    public setTokens(pTokens:number): void {
        this.tokens = pTokens;
    }

    public showData (): Player{
        return this
    }
}