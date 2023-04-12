import { Juego } from "./juego";
import { Player} from "./jugador";
import *  as  readlineSync from 'readline-sync';

export class Casino {
    private name;
    private tokenValue;
    private player: Player
    private minTokens;
    private game: Juego;

    constructor(pName: string, pTokenValue: number, pMinTokens: number) {
        this.name = pName;
        this.tokenValue = pTokenValue;
        this.minTokens = pMinTokens;
        this.game = new Juego
        this.player = this.getPlayer();


    }
    public getName(): string {
        return this.name;
    }

    public buyTokens(): void {
        let money = readlineSync.questionInt("Ingrese cantidad de dinero: ");
        while (money < this.tokenValue) {
            console.log(`Por favor ingrese un monto mayor a ${this.tokenValue} `);
            money = readlineSync.questionInt("Ingrese cantidad de dinero: ");
        }
        let tokens = money / this.tokenValue;
        let tokensActuales = this.player.getTokens();
        this.player.setTokens(tokensActuales + tokens);
        console.log(`Usted compró ${tokens} fichas`)
    }

     
    public Welcome (player :Player): string{
        return `Bienvenido ${player.getName}  ${player.getSurname} `
    }


    private Age(): number {
        let age = readlineSync.questionInt("Ingrese su edad:");
        return age;
    }
     public login() {
        let age =this.Age();
        if (age >= 18 && age < 100) {
            let name= readlineSync.question("Ingrese su nombre: ");
            let surname = readlineSync.question("Ingrese su apellido: ");
            let mail = readlineSync.questionEMail("Ingrese su email:");
            let player = new Player (name, surname, age, mail);
            this.newPlayer(player)
        } else {
            console.log("Usted es menor de edad, no puede ingresar a jugar");
        }
    }

    public newPlayer(player: Player): void {
        this.player = player;
    }

     public getPlayer(): Player {
        return this.player
    }
}
