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
exports.Juego = void 0;
const main_1 = require("./main");
const color = __importStar(require("colorette"));
class Juego {
    constructor(nombreJuego, apuestaMinima) {
        this.nombreJuego = nombreJuego;
        this.apuestaMinima = apuestaMinima;
        this.montoGanado = 0;
        this.montoApostado = 0;
    }
    //GETTERS AND SETTERS
    getNombreJuego() { return this.nombreJuego; }
    getApuestaMinima() { return this.apuestaMinima; }
    ;
    getMontoGanado() { return this.montoGanado; }
    ;
    //GUARDA EL MONTO DE LA APUESTA
    setMontoApostado(jugador) {
        let apuestaValida = false;
        while (apuestaValida == false) {
            let apuesta = jugador.apostar();
            if (this.validarMontoApostado(apuesta, jugador)) {
                this.montoApostado = apuesta;
                apuestaValida = true;
            }
            else {
                console.log('Ingrese nuevamente su apuesta ');
            }
        }
    }
    //VALIDA EL MONTO APOSTADO
    validarMontoApostado(montoApostado, jugador) {
        let esValido = false;
        let dineroDisponible = jugador.getDineroDisponible();
        if (montoApostado > 0 && montoApostado <= dineroDisponible && montoApostado >= this.apuestaMinima) {
            esValido = true;
        }
        else if (montoApostado < this.apuestaMinima) {
            console.log(color.red(`La apuesta mínima es de $ ${this.apuestaMinima}`));
        }
        else if (montoApostado > dineroDisponible) {
            console.log(color.red(`No tiene suficiente dinero disponible. El dinero disponible es $ ${dineroDisponible}`));
            (0, main_1.saldoInsuficiente)(jugador);
        }
        else {
            console.log(color.red('El monto apostado no puede ser $0 ni negativo'));
        }
        return esValido;
    }
    //SUMA O DESCUENTA EL PREMIO SEGÚN EL RESULTADO DEL JUEGO
    sumarDescontarPremio(resultado, dinero) {
        this.montoGanado = 0;
        if (resultado === 'Gano') {
            this.montoGanado += dinero;
            this.montoApostado = 0;
        }
        else if (resultado === 'Perdio') {
            this.montoGanado -= this.montoApostado;
            this.montoApostado = 0;
        }
        else if (resultado === 'noGanoNoPerdio') {
            this.montoApostado = 0;
        }
        return this.montoGanado;
    }
}
exports.Juego = Juego;
