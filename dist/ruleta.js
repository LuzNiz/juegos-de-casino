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
exports.Ruleta = void 0;
const readlineSync = __importStar(require("readline-sync"));
const game_1 = require("./game");
const clear_1 = __importDefault(require("clear"));
const color = __importStar(require("colorette"));
class Ruleta extends game_1.Game {
    constructor(name, apuestaMinima) {
        super(name, apuestaMinima);
        this.color = [color.red('Rojo'), color.green('Verde'), color.gray('Negro')];
        this.colorApostado = '';
        this.numeroApostado = 0;
        this.numeroGanador = 0;
        this.colorGanador = '';
        this.modalidadElegida = '';
    }
    setNumeroApostado() {
        let numeroCorrecto = false;
        let numero = 0;
        while (numeroCorrecto == false) {
            numero = readlineSync.questionInt('Ingrese numero al que desea apostar: ');
            if (numero >= 0 && numero <= 36) {
                this.numeroApostado = numero;
                numeroCorrecto = true;
            }
            else {
                console.log(color.red('Por favor ingrese un número entre 0 y 36'));
            }
        }
    }
    setColorApostado() {
        let colorIndex = readlineSync.keyInSelect(this.color);
        this.colorApostado = this.color[colorIndex];
    }
    //CALCULA EL COLOR GANADOR
    calcularColorGanador() {
        const numero = Math.floor(Math.random() * 3);
        const colorWin = this.color[numero];
        return colorWin;
    }
    //CALCULA EL NUMERO GANADOR
    calcularNumeroGanador() {
        const numero = Math.floor(Math.random() * 36);
        return numero;
    }
    //GIRA LA RULETA Y ASIGNA RESULTADOS
    girarRuleta() {
        console.log(color.green('Girando Ruelta...'));
        this.numeroGanador = this.calcularNumeroGanador();
        this.colorGanador = this.calcularColorGanador();
        console.log(`Ha salido el ${this.numeroGanador} ${this.colorGanador}`);
    }
    isWin() {
        let resultado = '';
        if (this.modalidadElegida === 'Color') {
            if (this.colorGanador === this.colorApostado) {
                resultado = 'Win';
                console.log(color.green(`Ud. ha ganado!. Se suman a su poso + ${this.montoApostado}`));
            }
            else if (this.colorGanador !== this.colorApostado && this.colorGanador === 'Verde') {
                console.log(color.bgBlue(`Usted no ganó ni perdió.`));
            }
            else {
                resultado = 'Lose';
                console.log(color.red('Usted perdió'));
            }
        }
        else if (this.modalidadElegida === 'Numero') {
            if (this.numeroGanador === this.numeroApostado) {
                resultado = 'Win';
                console.log(color.green('Ha ganado'));
            }
            else if (this.numeroGanador !== this.numeroApostado && this.numeroGanador === 0) {
                console.log(color.blue('Usted no ganó ni perdió'));
            }
            else {
                resultado = 'Lose';
                console.log(color.red('Usted perdió'));
            }
        }
        else {
            if (this.numeroGanador === this.numeroApostado && this.colorGanador === this.colorApostado) {
                resultado = 'Win';
                console.log(color.green('Ha ganado'));
            }
            else if (this.numeroGanador === this.numeroApostado || this.colorGanador === this.colorApostado) {
                resultado = 'noWinNoLost';
                console.log(color.blue('Usted no ganó ni perdió'));
            }
            else {
                resultado = 'Lose';
                console.log(color.red('Usted perdió'));
            }
        }
        return this.sumarDescontarPremio(resultado, this.montoApostado);
    }
    selectType() {
        console.log('Seleccione la modalidad en la que quiere apostar');
        const opciones = ['Color', 'Numero', 'Ambas'];
        let option = readlineSync.keyInSelect(opciones);
        this.modalidadElegida = opciones[option];
        switch (option) {
            case 0:
                this.setColorApostado();
                break;
            case 1:
                this.setNumeroApostado();
                break;
            default:
                this.setColorApostado();
                this.setNumeroApostado();
                break;
        }
        this.girarRuleta();
    }
    app() {
        this.selectType();
        this.isWin();
        return this.montoGanado;
    }
    play(player) {
        let jugar = true;
        while (jugar) {
            this.setMontoApostado(player);
            let montoGanado = this.app();
            player.setAvailableMoney(montoGanado);
            console.log(`Su saldo actual es de ${player.getvailableMoney()}`);
            const respuesta = readlineSync.keyInYNStrict('Desea seguir jugando? ');
            if (respuesta == false) {
                jugar = false;
            }
            (0, clear_1.default)();
        }
    }
}
exports.Ruleta = Ruleta;
