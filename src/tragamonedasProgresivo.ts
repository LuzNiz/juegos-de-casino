import { Jugador } from "./jugador";
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
      
        public esGanador(): number {
          let resultado = '';
          if (this.numeros[0] === this.numeros[1] && this.numeros[1] === this.numeros[2]){ 
            resultado = 'Gano';
            console.log(color.green(`¡Felicidades, ganaste el jackpot de ${this.jackpot} dólares!`));
          } else {
              resultado = 'Perdio';
              console.log(color.red("¡Casi, inténtalo de nuevo!"));
          } 
          this.numeros = [];         
          return this.sumarDescontarPremio(resultado, (this.montoApostado + this.jackpot));
        }

        public jugar(jugador: Jugador): void {
          let seguirjugando = true;
          while(seguirjugando) {
            this.setMontoApostado(jugador);
            this.girar();
            let montoGanado = this.esGanador();
            if(montoGanado >= 0 ){
              this.jackpot = this.getApuestaMinima();
            }else {
              this.jackpot += 1000;
            }
            jugador.setDineroDisponible(montoGanado);
            console.log(color.magenta(`El valor del jackpot es ${this.jackpot}`));
            console.log(`Su saldo actual es de ${jugador.getDineroDisponible()}`)
            const respuesta = readlineSync.keyInYNStrict('Desea seguir jugando? ');
            if(respuesta == false){
              seguirjugando = false;
            }
            clear();
          }
        }

}