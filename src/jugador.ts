import * as readlineSync from 'readline-sync';
import * as color from "colorette";

export class Jugador {
    private nombre: string;
    private dineroDisponible: number;

    public constructor(nombre: string){
        this.nombre = nombre;
        this.dineroDisponible = 0;
    }

    //GETTERS AND SETTERS
    public getNombre(): string{ return this.nombre};
    public setNombre(nombre: string): void{ this.nombre = nombre};

    public getDineroDisponible(): number{return this.dineroDisponible};
    public setDineroDisponible(dinero: number): void{
            this.dineroDisponible += dinero;
    };

    public reiniciarDineroDisponible(): void {
        this.dineroDisponible = 0;
    }
    //METODO QUE MUESTRA EL SALDO DEL JUGADOR
    public mostrarSaldo(): void{
        console.log(color.green(`
        ------------------------------------------------------
        Su saldo actual es de: $ ${this.dineroDisponible}
        ------------------------------------------------------
        `));
    }

    public apostar(): number{
        let importe: number = readlineSync.questionInt('Ingrese el monto que quiere apostar: ');
        let valorApuesta: number = importe;
        return valorApuesta;
    }
}