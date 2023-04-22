import * as readlineSync from 'readline-sync';
import * as color from "colorette";

export class Player {
    private firstName: string;
    private availableMoney: number;

    public constructor(firstName: string){
        this.firstName = firstName;
        this.availableMoney = 0;
    }
    //GETTERS AND SETTERS
    public getFirstName(): string{ return this.firstName};
    public setFirstName(firstName: string): void{ this.firstName = firstName};

    public getvailableMoney(): number{return this.availableMoney};
    public setAvailableMoney(money: number): void{
        if(money == 0){
            this.availableMoney = 0;
        }else{
            this.availableMoney += money
        }
    };

    //METODO QUE RETORNA AL JUGADOR
    public showData(): Player{return this}; //¿Necesario?

    //METODO QUE MUESTRA EL SALDO DEL JUGADOR
    public checkBalance(): void{
        console.log(color.green(`
        ------------------------------------------------------
        Su saldo actual es de: $ ${this.availableMoney}
        ------------------------------------------------------
        `));
    }

    public apostar(): number{
        let importe: number = readlineSync.questionInt('Ingrese el monto que quiere apostar: ');
        let valorApuesta: number = importe;
        return valorApuesta;
    }
}