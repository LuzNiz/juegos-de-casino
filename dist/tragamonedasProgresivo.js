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
exports.TragamonedaProgresivo = void 0;
const tragamonedas_1 = require("./tragamonedas");
const clear_1 = __importDefault(require("clear"));
const readlineSync = __importStar(require("readline-sync"));
const color = __importStar(require("colorette"));
class TragamonedaProgresivo extends tragamonedas_1.Tragamonedas {
    constructor(name, apuestaMinima) {
        super(name, apuestaMinima);
        this.jackpot = apuestaMinima;
    }
    girar() {
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
    esGanador() {
        let resultado = '';
        if (this.numeros[0] === this.numeros[1] && this.numeros[1] === this.numeros[2]) {
            resultado = 'Gano';
            console.log(color.green(`¡Felicidades, ganaste el jackpot de ${this.jackpot} dólares!`));
        }
        else {
            resultado = 'Perdio';
            console.log(color.red("¡Casi, inténtalo de nuevo!"));
        }
        this.numeros = [];
        return this.sumarDescontarPremio(resultado, (this.montoApostado + this.jackpot));
    }
    jugar(jugador) {
        let seguirjugando = true;
        while (seguirjugando) {
            this.setMontoApostado(jugador);
            this.girar();
            let montoGanado = this.esGanador();
            if (montoGanado >= 0) {
                this.jackpot = this.getApuestaMinima();
            }
            else {
                this.jackpot += 1000;
            }
            jugador.setDineroDisponible(montoGanado);
            console.log(color.magenta(`El valor del jackpot es ${this.jackpot}`));
            console.log(`Su saldo actual es de ${jugador.getDineroDisponible()}`);
            const respuesta = readlineSync.keyInYNStrict('Desea seguir jugando? ');
            if (respuesta == false) {
                seguirjugando = false;
            }
            (0, clear_1.default)();
        }
    }
}
exports.TragamonedaProgresivo = TragamonedaProgresivo;
