import * as readlineSync from 'readline-sync';
import { Game } from './game';
import { Player } from './player';
import * as color from "colorette";

interface Carta {
  valor: number;
  palo: string;
  texto: string;
}
export class Blackjack extends Game{
  private mazo: Carta[];
  private manoJugador: Carta[];
  private manoDealer: Carta[];
  private palos: string[];
  private valores: string[];

  public constructor(name: string, apuestaMinima: number) {
    super(name, apuestaMinima);
    this.mazo = [];
    this.manoJugador = [];
    this.manoDealer = [];
    this.palos = ["Corazones", "Diamantes", "Tréboles", "Picas"];//
    this.valores = ['As', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];//
  }
  private crearMazo() {
    for (let valor = 0; valor < this.valores.length; valor++) {
      for (let palo = 0; palo < this.palos.length; palo++) {
        this.mazo.push({
          valor: valor,
          palo: this.palos[palo],
          texto: `${this.valores[valor]} de ${this.palos[palo]}`
        });
      }
    }
  }

  private mezclarMazo() {
    for (let i = this.mazo.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.mazo[i], this.mazo[j]] = [this.mazo[j], this.mazo[i]];
    }
  }

  private repartirCarta(mano: Carta[]) {
    mano.push(this.mazo.pop()!);
  }

  private mostrarMano(mano: Carta[]) {
    return mano.map(carta => carta.texto).join(', ');// .MAP utilizada para transformar cada objeto carta en una cadena de texto.
  }      
  // .JOIN une todas las cadenas de texto con una , y un espacio entre cada una.
  private sumarMano(mano: Carta[]) {
    let total = 0; // inicializo las dos variables
    let ases = 0;
    for (let carta of mano) { //recorro cada carta DE la mano
      if (carta.valor === 0) {// si el valor de la carta es igual a 0, incremento 
        ases++;
      } else if (carta.valor >= 9) {// si el valor es mayor o igual a 9, la carta suma 10 (10,rey,reina,jota)
        total += 10;
      } else {
        total += carta.valor + 1; // demas cartas menos el as suman 1, se suman al total
      }
    }
    for (let i = 0; i < ases; i++) { // el ass vale 11
      if (total + 11 > 21) { //si le sumo 11 al total y el resultado me da mayor que 21, el as vale 1
        total += 1; //por lo que al total le sumamos 1
      } else {
        total += 11; // sino el As vale 11 puntos , entonces se le suma 11 al total
      }
    }
    return total;
  }

  public asignarCartas(): number {
    this.crearMazo();
    this.mezclarMazo();
    for(let i: number= 0; i < 2; i++){
      this.repartirCarta(this.manoJugador);
      this.repartirCarta(this.manoDealer);
    }
    console.log(color.red(`
    ---------------------------------------------
    El dealer muestra ${this.manoDealer[0].texto}
    --------------------------------------------
    `));// [1]deale muestra el 6 mas el texto = palos
    console.log(color.green(`
    ----------------------------------------------
    Tu mano: ${this.mostrarMano(this.manoJugador)}
    ----------------------------------------------
    `));
    let totalJugador = this.sumarMano(this.manoJugador);
    console.log(color.magenta(`
    -------------
    |Total:         |
    |${totalJugador}|
    -------------
    `));  
    let respuesta = readlineSync.keyInYNStrict('¿Quiere 1 carta mas?: ');
    if (respuesta) {
      this.repartirCarta(this.manoJugador);
      console.log(color.red(`
      ---------------------------------------------
      El dealer muestra ${this.manoDealer[0].texto}
      --------------------------------------------
      `));
    } else {
      console.log('¡Gracias por jugar!');
    }
    totalJugador = this.sumarMano(this.manoJugador);
    return totalJugador;
  }

  public isWin(): number {
    let totalJugador: number = this.asignarCartas();
    let totalDealer: number = this.sumarMano(this.manoDealer);
    let resultado: string = 'Lose';
    let dinero: number = this.montoApostado;
    console.log(`Tu mano: ${this.mostrarMano(this.manoJugador)}`);
    console.log(`Total: ${totalJugador}`);
    if (totalJugador === 21) {
      resultado = 'Win';
      console.log(`Usted gana. Se suma a su pozo +${dinero}`);
    }else if (totalJugador >= 0 && totalJugador < 21) {
      this.repartirCarta(this.manoDealer);
      console.log(`Mano del dealer: ${this.mostrarMano(this.manoDealer)}`);
      totalDealer = this.sumarMano(this.manoDealer);
      console.log(color.magentaBright(`
      -------------
      |Total Dealer:  |
      |${totalDealer}|
      -------------
      `));
      if (totalDealer === 21) {
        resultado = 'Lose';
        console.log(color.red('El casino ha sacado 21. Ud. pierde'));
      } else if (totalDealer > 21) {
        resultado = 'Win';
        console.log(color.green('Ha ganado. El casino ha sacado más de 21'));
      } else if (totalDealer > totalJugador) {
        resultado = 'Lose';
        console.log(color.red('El casino ha sacado una mano mayor. Ud. pierde'));
      } else if (totalDealer === totalJugador) {
        resultado = 'noWinNoLose';
        console.log(color.blue('Saco lo mismo que el casino. No gana ni pierde'));
      } else {
        resultado = 'Win';
        console.log(color.green('Ha ganado. Ud. ha sacado una mano mayor que el casino'));
      }
    }else {
      resultado = 'Lose';
      console.log(color.red('Ha perdido. Ha sacado más que 21'));
    }
    this.manoJugador = [];
    this.manoDealer = [];
    return this.sumarDescontarPremio(resultado, dinero);
  }

  public play(player :Player): void {
    let jugar = true;
      while(jugar) {
        this.setMontoApostado(player);
        let montoGanado = this.isWin();
        player.setAvailableMoney(montoGanado);
        console.log(`Su saldo actual es de ${player.getvailableMoney()}`)
        let respuesta = readlineSync.keyInYNStrict('Queres jugar nuevamente?:');
        if (respuesta == false) {
          console.log('¡Gracias por jugar!');
          jugar = false;
        }
      }
  }
}
