import { Jugador } from "./jugador";
import { Tragamonedas} from "./tragamonedas";
import * as readlineSync from 'readline-sync';
import clear from 'clear';
import * as color from "colorette";

export class TragamonedaEstandar extends Tragamonedas {

    constructor(nombre: string, apuestaMinima: number) {
        super(nombre, apuestaMinima);
    }
    public girar(): void {
        const resultado1 = Math.floor(Math.random() * 5);
        const resultado2 = Math.floor(Math.random() * 5);
        const resultado3 = Math.floor(Math.random() * 5);
        this.numeros.push(resultado1, resultado2, resultado3);

        console.log(`
        ----------
        ${color.red(resultado1)} | ${color.green(resultado2)} | ${color.blue(resultado3)} |
        ----------
        `);
    }

    public esGanador(): number {
        let resultado = '';
        if (this.numeros[0] === this.numeros[1] && this.numeros[1] === this.numeros[2]){ 
            resultado = 'Gano';
            console.log(color.green(`¡Felicidades, ganaste!`));
        } else {
            resultado = 'Perdio';
            console.log(color.red("¡Casi, inténtalo de nuevo!"));
        } 
        this.numeros = [];         
        return this.sumarDescontarPremio(resultado, (this.montoApostado));
    }

    public jugar(jugador: Jugador): void {
        let seguirjugando = true;
        while(seguirjugando) {
            this.setMontoApostado(jugador);
            this.girar();
            let montoGanado = this.esGanador();
            jugador.setDineroDisponible(montoGanado);
            console.log(`Su saldo actual es de ${jugador.getDineroDisponible()}`)
            const respuesta = readlineSync.keyInYNStrict('Desea seguir jugando? ');
            if(respuesta == false){
                seguirjugando = false;
            }
            clear();
        }
    }
}

