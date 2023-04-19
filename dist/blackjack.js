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
const readline = __importStar(require("readline-sync"));
class Blackjack {
    constructor() {
        this.mazo = [];
        this.jugadorMano = [];
        this.dealerMano = [];
        this.palos = ["Corazones", "Diamantes", "Tréboles", "Picas"];
        this.valores = ['As', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    }
    crearMazo() {
        for (let valor = 0; valor < this.valores.length; valor++) {
            for (let palo = 0; palo < this.palos.length; palo++) {
                this.mazo.push({ valor: valor, palo: this.palos[palo], texto: `${this.valores[valor]} de ${this.palos[palo]}` });
            }
        }
    }
    mezclarMazo() {
        for (let i = this.mazo.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.mazo[i], this.mazo[j]] = [this.mazo[j], this.mazo[i]];
        }
    }
    repartirCarta(mano) {
        mano.push(this.mazo.pop()); //.pop elimina el ultimo elemento de un array y lo devuelve-/.push añade un elemento al final del array
    }
    mostrarMano(mano) {
        return mano.map(carta => carta.texto).join(', '); // .MAP utilizada para transformar cada objeto carta en una cadena de texto.
    } // .JOIN une todas las cadenas de texto con una , y un espacio entre cada una.
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
    jugar() {
        console.log('¡Bienvenido/a al juego de Blackjack!');
        while (true) {
            this.crearMazo();
            this.mezclarMazo();
            this.jugadorMano = [];
            this.dealerMano = [];
            this.repartirCarta(this.jugadorMano);
            this.repartirCarta(this.dealerMano);
            this.repartirCarta(this.jugadorMano);
            this.repartirCarta(this.dealerMano);
            console.log(`El dealer muestra ${this.dealerMano[1].texto}`); // deale muestra el 6 mas el texto = palos
            while (true) {
                console.log(`Tu mano: ${this.mostrarMano(this.jugadorMano)}`);
                let totalJugador = this.sumarMano(this.jugadorMano);
                console.log(`Total: ${totalJugador}`);
                if (totalJugador > 21) {
                    console.log('Te pasaste de 21. Has perdido.');
                    break;
                }
                let respuesta = readline.question('Queres otra carta?: ');
                if (respuesta === 'si') {
                    this.repartirCarta(this.jugadorMano);
                }
                else {
                    console.log('¡Gracias por jugar!');
                    break;
                }
            }
            let totalJugador = this.sumarMano(this.jugadorMano);
            if (totalJugador <= 21) {
                console.log('Tu mano: ${ this.mostrarMano(this.jugadorMano) }');
                console.log('Total: ${ totalJugador }');
                while (this.sumarMano(this.dealerMano) < 17) {
                    this.repartirCarta(this.dealerMano);
                }
                console.log('Mano del dealer: ${ this.mostrarMano(this.dealerMano)}');
                let totalDealer = this.sumarMano(this.dealerMano);
                console.log('Total del dealer: ${ totalDealer }');
                if (totalDealer > 21) {
                    console.log('El dealer se pasó de 21. Has ganado!');
                }
                else {
                    console.log('El dealer gana. Has perdido.');
                }
            }
            let respuesta = readline.question('Queres jugar nuevamente? (si/no):');
            if (respuesta !== 'si') {
                console.log('¡Gracias por jugar!');
                break;
            }
        }
    }
}
exports.Blackjack = Blackjack;
const juego = new Blackjack();
juego.jugar();
