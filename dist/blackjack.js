"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blackjack = void 0;
const readlineSync = __importStar(require("readline-sync"));
const game_1 = require("./game");
const color = __importStar(require("colorette"));
class Blackjack extends game_1.Game {
    constructor(name, apuestaMinima) {
        super(name, apuestaMinima);
        this.mazo = [];
        this.manoJugador = [];
        this.manoDealer = [];
        this.palos = ["Corazones", "Diamantes", "Tréboles", "Picas"]; //
        this.valores = ['As', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']; //
    }
    crearMazo() {
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
    mezclarMazo() {
        for (let i = this.mazo.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.mazo[i], this.mazo[j]] = [this.mazo[j], this.mazo[i]];
        }
    }
    repartirCarta(mano) {
        mano.push(this.mazo.pop());
    }
    mostrarMano(mano) {
        return mano.map(carta => carta.texto).join(', '); // .MAP utilizada para transformar cada objeto carta en una cadena de texto.
    }
    // .JOIN une todas las cadenas de texto con una , y un espacio entre cada una.
    sumarMano(mano) {
        let total = 0; // inicializo las dos variables
        let ases = 0;
        for (let carta of mano) { //recorro cada carta DE la mano
            if (carta.valor === 0) { // si el valor de la carta es igual a 0, incremento 
                ases++;
            }
            else if (carta.valor >= 9) { // si el valor es mayor o igual a 9, la carta suma 10 (10,rey,reina,jota)
                total += 10;
            }
            else {
                total += carta.valor + 1; // demas cartas menos el as suman 1, se suman al total
            }
        }
        for (let i = 0; i < ases; i++) { // el ass vale 11
            if (total + 11 > 21) { //si le sumo 11 al total y el resultado me da mayor que 21, el as vale 1
                total += 1; //por lo que al total le sumamos 1
            }
            else {
                total += 11; // sino el As vale 11 puntos , entonces se le suma 11 al total
            }
        }
        return total;
    }
    asignarCartas() {
        this.crearMazo();
        this.mezclarMazo();
        for (let i = 0; i < 2; i++) {
            this.repartirCarta(this.manoJugador);
            this.repartirCarta(this.manoDealer);
        }
        console.log(color.red(`
    ---------------------------------------------
    El dealer muestra ${this.manoDealer[0].texto}
    --------------------------------------------
    `)); // [1]deale muestra el 6 mas el texto = palos
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
        }
        else {
            console.log('¡Gracias por jugar!');
        }
        totalJugador = this.sumarMano(this.manoJugador);
        return totalJugador;
    }
    isWin() {
        let totalJugador = this.asignarCartas();
        let totalDealer = this.sumarMano(this.manoDealer);
        let resultado = 'Lose';
        let dinero = this.montoApostado;
        console.log(`Tu mano: ${this.mostrarMano(this.manoJugador)}`);
        console.log(`Total: ${totalJugador}`);
        if (totalJugador === 21) {
            resultado = 'Win';
            console.log(`Usted gana. Se suma a su pozo +${dinero}`);
        }
        else if (totalJugador >= 0 && totalJugador < 21) {
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
            }
            else if (totalDealer > 21) {
                resultado = 'Win';
                console.log(color.green('Ha ganado. El casino ha sacado más de 21'));
            }
            else if (totalDealer > totalJugador) {
                resultado = 'Lose';
                console.log(color.red('El casino ha sacado una mano mayor. Ud. pierde'));
            }
            else if (totalDealer === totalJugador) {
                resultado = 'noWinNoLose';
                console.log(color.blue('Saco lo mismo que el casino. No gana ni pierde'));
            }
            else {
                resultado = 'Win';
                console.log(color.green('Ha ganado. Ud. ha sacado una mano mayor que el casino'));
            }
        }
        else {
            resultado = 'Lose';
            console.log(color.red('Ha perdido. Ha sacado más que 21'));
        }
        this.manoJugador = [];
        this.manoDealer = [];
        return this.sumarDescontarPremio(resultado, dinero);
    }
    play(player) {
        let jugar = true;
        while (jugar) {
            this.setMontoApostado(player);
            let montoGanado = this.isWin();
            player.setAvailableMoney(montoGanado);
            console.log(`Su saldo actual es de ${player.getvailableMoney()}`);
            let respuesta = readlineSync.keyInYNStrict('Queres jugar nuevamente?:');
            if (respuesta == false) {
                console.log('¡Gracias por jugar!');
                jugar = false;
            }
        }
    }
}
exports.Blackjack = Blackjack;
