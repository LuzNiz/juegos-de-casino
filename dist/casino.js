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
exports.Casino = void 0;
const blackjack_1 = require("./blackjack");
const ruleta_1 = require("./ruleta");
const readlineSync = __importStar(require("readline-sync"));
const tragamonedasProgresivo_1 = require("./tragamonedasProgresivo");
const tragamonedaEstandar_1 = require("./tragamonedaEstandar");
const color = __importStar(require("colorette"));
class Casino {
    //CONSTRUCTOR
    constructor(nombre, edadMinimaPermitida) {
        this.nombreCasino = nombre;
        this.edadMinimaPermitida = edadMinimaPermitida;
        this.ruleta = new ruleta_1.Ruleta("Ruleta", 1000);
        this.blackjack = new blackjack_1.Blackjack("BlackJack", 400);
        this.tragamonedaProgresivo = new tragamonedasProgresivo_1.TragamonedaProgresivo('Tragamoneda Progresiva', 1000);
        this.tragamonedaEstandar = new tragamonedaEstandar_1.TragamonedaEstandar('Tragamonedas Estandar', 500);
    }
    //GETTERS AND SETTERS
    getNombreCasino() { return this.nombreCasino; }
    ;
    setNombreCasino(nombreCasino) { this.nombreCasino = nombreCasino; }
    ;
    getEdadMinimaPermitida() { return this.edadMinimaPermitida; }
    ;
    setEdadMinimaPermitida(edadMinimaPermitida) { this.edadMinimaPermitida = edadMinimaPermitida; }
    ;
    getBlackJack() { return this.blackjack; }
    ;
    getRuleta() { return this.ruleta; }
    ;
    getTragamonedasProgresivo() { return this.tragamonedaProgresivo; }
    ;
    getTragamonedasEstandar() { return this.tragamonedaEstandar; }
    ;
    //METODO PARA VERIFICAR SI CUMPLE CON LOS REQUISITOS DE EDAD PARA INGRESAR
    verificarAcceso() {
        let estaPermitido = false;
        let accesso = false;
        while (!estaPermitido) {
            const regex = /[~`!@#$%\^&*()\-_=+\[\]{}\\|;:",<.>\/?]/;
            const edadString = readlineSync.question('Por favor, ingrese su edad: ');
            if (!regex.test(edadString)) {
                const edad = Number(edadString);
                if (edad !== 0 && edad <= 99) {
                    if (edadString.startsWith('0')) {
                        console.log(color.red('Ingrese una edad sin 0s a la izquierda'));
                    }
                    else {
                        if (edad >= this.edadMinimaPermitida) {
                            accesso = true;
                            estaPermitido = true;
                        }
                        estaPermitido = true;
                    }
                }
                else {
                    console.log(color.red('Por favor, ingrese una edad mayor a 0 y menor a 99 años'));
                }
            }
        }
        return accesso;
    }
    transferirPremio(jugador) {
        if (jugador.getDineroDisponible() > 0) {
            console.log(color.green(`Le hemos transferido $ ${jugador.getDineroDisponible()}`));
            jugador.reiniciarDineroDisponible();
        }
        else {
            console.log(color.red('Usted no tiene dinero para cobrar'));
        }
    }
}
exports.Casino = Casino;
