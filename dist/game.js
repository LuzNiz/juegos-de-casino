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
exports.Game = void 0;
const main_1 = require("./main");
const color = __importStar(require("colorette"));
class Game {
    constructor(name, apuestaMinima) {
        this.name = name;
        this.apuestaMinima = apuestaMinima;
        this.montoGanado = 0;
        this.montoApostado = 0;
    }
    getName() { return this.name; }
    getApuestaMinima() { return this.apuestaMinima; }
    ;
    getMontoGanado() { return this.montoGanado; }
    ;
    //GUARDA EL MONTO DE LA APUESTA
    setMontoApostado(player) {
        let apuestaValida = false;
        while (apuestaValida == false) {
            let apuesta = player.apostar();
            if (this.validarMontoApostado(apuesta, player)) {
                this.montoApostado = apuesta;
                apuestaValida = true;
            }
            else {
                console.log('Ingrese nuevamente su apuesta ');
            }
        }
    }
    validarMontoApostado(montoApostado, player) {
        let esValido = false;
        let dineroDisponible = player.getvailableMoney();
        if (montoApostado > 0 && montoApostado <= dineroDisponible && montoApostado >= this.apuestaMinima) {
            esValido = true;
        }
        else if (montoApostado < this.apuestaMinima) {
            console.log(color.red(`La apuesta mínima es de $ ${this.apuestaMinima}`));
        }
        else if (montoApostado > dineroDisponible) {
            console.log(color.red(`No tiene suficiente dinero disponible. El dinero disponible es $ ${dineroDisponible}`));
            (0, main_1.saldoInsuficiente)(player);
        }
        else {
            console.log(color.red('El monto apostado no puede ser $0 ni negativo'));
        }
        return esValido;
    }
    sumarDescontarPremio(resultado, dinero) {
        this.montoGanado = 0;
        if (resultado === 'Win') {
            this.montoGanado += dinero;
            this.montoApostado = 0;
        }
        else if (resultado === 'Lose') {
            this.montoGanado -= this.montoApostado;
            this.montoApostado = 0;
        }
        else if (resultado === 'noWinNoLose') {
            this.montoApostado = 0;
        }
        return this.montoGanado;
    }
    play(player) {
    }
    isWin() {
        return 0;
    }
}
exports.Game = Game;
