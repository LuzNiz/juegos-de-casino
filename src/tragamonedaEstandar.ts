import { Player } from "./player";
import { Tragamonedas} from "./tragamonedas";
import * as readlineSync from 'readline-sync';
import clear from 'clear';
import * as color from "colorette";

export class TragamonedaEstandar extends Tragamonedas {

    constructor(name: string, apuestaMinima: number) {
        super(name, apuestaMinima);
    }
    
    public isWin(): number {
        let resultado = '';
        if (this.numeros[0] === this.numeros[1] && this.numeros[1] === this.numeros[2]){ 
            resultado = 'Win';
            console.log(color.green(`¡Felicidades, ganaste!`));
        } else {
            resultado = 'Lose';
            console.log(color.red("¡Casi, inténtalo de nuevo!"));
        } 
        this.numeros = [];         
        return this.sumarDescontarPremio(resultado, (this.montoApostado));
    }

    public play(player: Player): void {
        let seguirjugando = true;
        while(seguirjugando) {
            this.setMontoApostado(player);
            this.girar();
            let montoGanado = this.isWin();
            player.setAvailableMoney(montoGanado);
            console.log(`Su saldo actual es de ${player.getvailableMoney()}`)
            const respuesta = readlineSync.keyInYNStrict('Desea seguir jugando? ');
            if(respuesta == false){
                seguirjugando = false;
            }
            clear();
        }
    }
}

