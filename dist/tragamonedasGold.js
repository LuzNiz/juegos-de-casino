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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TragamonedasProgresivo = void 0;
const tragamonedas_1 = require("./tragamonedas");
const clear_1 = __importDefault(require("clear"));
const readlineSync = __importStar(require("readline-sync"));
class TragamonedasProgresivo extends tragamonedas_1.Tragamonedas {
    constructor(name, apuestaMinima) {
        super(name, apuestaMinima);
        this.jackpot = apuestaMinima;
        this.numeros = [];
    }
    girar() {
        const resultado1 = Math.floor(Math.random() * 5);
        const resultado2 = Math.floor(Math.random() * 5);
        const resultado3 = Math.floor(Math.random() * 5);
        this.numeros.push(resultado1, resultado2, resultado3);
        console.log(`
          ----------------------------------------------
          ${resultado1} | ${resultado2} | ${resultado3} |
          ----------------------------------------------
          `);
    }
    isWin() {
        let resultado = '';
        if (this.numeros[0] === this.numeros[1] && this.numeros[1] === this.numeros[2]) {
            resultado = 'Win';
            console.log(`¡Felicidades, ganaste el jackpot de ${this.jackpot} dólares!`);
        }
        else {
            resultado = 'Lose';
            console.log("¡Casi, inténtalo de nuevo!");
        }
        this.numeros = [];
        return this.ganoPerdio(resultado, (this.montoApostado + this.jackpot));
    }
    play(player) {
        let seguirjugando = true;
        while (seguirjugando) {
            let apuesta = player.apostar();
            this.setMontoApostado(apuesta, player);
            this.girar();
            let montoGanado = this.isWin();
            if (montoGanado >= 0) {
                this.jackpot = this.getApuestaMinima();
            }
            else {
                this.jackpot += 1000;
            }
            player.setAvailableMoney(montoGanado);
            console.log(`El valor del jackpot es ${this.jackpot}`);
            console.log(`Su saldo actual es de ${player.getvailableMoney()}`);
            const respuesta = readlineSync.keyInYNStrict('Desea seguir jugando? ');
            if (respuesta == false) {
                seguirjugando = false;
            }
            (0, clear_1.default)();
        }
    }
}
exports.TragamonedasProgresivo = TragamonedasProgresivo;
