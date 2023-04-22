import { Player } from "./player";
import { Tragamonedas} from "./tragamonedas";
import clear from 'clear';
import * as readlineSync from 'readline-sync';
import * as color from "colorette";


export class TragamonedaProgresivo extends Tragamonedas {
        private jackpot: number;
    
        constructor(name: string, apuestaMinima: number) {
          super(name, apuestaMinima);
          this.jackpot = apuestaMinima;
        }
      
        public isWin(): number {
          let resultado = '';
          if (this.numeros[0] === this.numeros[1] && this.numeros[1] === this.numeros[2]){ 
            resultado = 'Win';
            console.log(color.green(`¡Felicidades, ganaste el jackpot de ${this.jackpot} dólares!`));
          } else {
              resultado = 'Lose';
              console.log(color.red("¡Casi, inténtalo de nuevo!"));
          } 
          this.numeros = [];         
          return this.sumarDescontarPremio(resultado, (this.montoApostado + this.jackpot));
        }

        public play(player: Player): void {
          let seguirjugando = true;
          while(seguirjugando) {
            this.setMontoApostado(player);
            this.girar();
            let montoGanado = this.isWin();
            if(montoGanado >= 0 ){
              this.jackpot = this.getApuestaMinima();
            }else {
              this.jackpot += 1000;
            }
            player.setAvailableMoney(montoGanado);
            console.log(color.magenta(`El valor del jackpot es ${this.jackpot}`));
            console.log(`Su saldo actual es de ${player.getvailableMoney()}`)
            const respuesta = readlineSync.keyInYNStrict('Desea seguir jugando? ');
            if(respuesta == false){
              seguirjugando = false;
            }
            clear();
          }
        }

}