import { Player } from "./player";
import { Game } from "./game";

import *  as  readlineSync from 'readline-sync';

export class Casino {
    private name: string;
    private tokensValue: number;
    private player: Player;
    private cantidadMinFichas: number
    private game: Game;

    public constructor(name: string, tokensValue: number, cantidadMinFichas : number){
        this.name = name;
        this.tokensValue = tokensValue;
        this.cantidadMinFichas = cantidadMinFichas;
        this.player = this.getPlayer();
        this.game = new Game ("Ruleta", 100, 5,1);

    }
    public getName(): string{
        return this.name;
    }

    public buyTokens(): void{
        let money = readlineSync.questionInt("Ingrese cantidad de dinero: ");
        while(money < this.tokensValue){
            console.log(`Por favor ingrese un monto mayor a ${this.tokensValue}`);
            money = readlineSync.questionInt("Ingrese cantidad de dinero: ");
        }
        let tokens = money / this.tokensValue;
        let tokensActuales = this.player.getTokens();
        this.player.setTokens(tokensActuales + tokens);
        console.log(`Usted compró ${tokens} fichas`)
    }


    public welcome(player: Player): string{
        return `Bienvenido ${player.getName} ${player.getSurname}`
    }

    private pedirEdad(): number{
        let edad = readlineSync.questionInt("Ingrese su edad: ");
        return edad;
    }
    public login(){
        let edad = this.pedirEdad();
        if(edad >= 18 && edad < 95){
            let firstName = readlineSync.question("Ingrese su nombre: ");
            let lastName = readlineSync.question("Ingrese su apellido: ");
            let email= readlineSync.questionEMail("Ingrese su email: ");
            let player = new Player(firstName, lastName, edad, email);
            this.newPlayer(player);
        }else {
            console.log("Usted es menor de edad, no puede ingresar a jugar");
        }
    }

    public newPlayer(player: Player): void{
        this.player = player;
    }

    public getPlayer(): Player{
        return this.player;
    }
}