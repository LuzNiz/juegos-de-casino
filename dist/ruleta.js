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
exports.Ruleta = void 0;
const readline = __importStar(require("readline-sync"));
class Ruleta {
    constructor() {
        this.num = []; //1, 2, 3, 4, 5, 6, 7, 8, 9, 10
        this.color = [];
    }
    play() {
        console.log('¡Bienvenido/a al juego de Ruleta!');
        const bet = readline.question('Por favor, realice su apuesta (Numero o color): ');
        const money = parseInt(readline.question('Por favor, escriba el monto que desea apostar:  '));
        for (let i = 0; i < 10; i++) { // inicializo, mientras se cumpl la condicion ++ 
            this.num.push(i); //empuja el numero
            if ((i >= 1 && i <= 5)) {
                this.color.push('Rojo');
            }
            else {
                this.color.push('Negro');
            }
        }
        if (this.num.concat(parseInt(bet))) { //parseInt: devuelve el entero
            const numWin = this.spin();
            if (parseInt(bet) === numWin) {
                console.log(`Has ganado $${money * 10}. Felicidades!`);
            }
            else {
                console.log(`El número ganador es ${numWin}. Has perdido tu apuesta $${money}.`);
            }
        }
        else if (this.color.concat(bet.toLowerCase())) {
            const winColor = this.color[this.spin()];
            if (bet.toLowerCase() === winColor) {
                console.log(`Has ganado $${money}!Felicidades`);
            }
            else {
                console.log(`El color ganador es ${winColor}. Has perdido $${money}.`);
            }
        }
        else {
            console.log('Apuesta invalida.');
        }
    }
    spin() {
        console.log('Girando la ruleta. Aguarde un momento...');
        const winNum = Math.floor(Math.random() * 10);
        console.log(`Ha salido ${winNum} (${this.color[winNum]}).`);
        return winNum;
    }
}
exports.Ruleta = Ruleta;
const ruleta1 = new Ruleta();
ruleta1.play();
