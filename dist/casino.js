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
const juego_1 = require("./juego");
const jugador_1 = require("./jugador");
const readlineSync = __importStar(require("readline-sync"));
class Casino {
    constructor(pName, pTokenValue, pMinTokens) {
        this.name = pName;
        this.tokenValue = pTokenValue;
        this.minTokens = pMinTokens;
        this.game = new juego_1.Juego;
        this.player = this.getPlayer();
    }
    getName() {
        return this.name;
    }
    buyTokens() {
        let money = readlineSync.questionInt("Ingrese cantidad de dinero: ");
        while (money < this.tokenValue) {
            console.log(`Por favor ingrese un monto mayor a ${this.tokenValue} `);
            money = readlineSync.questionInt("Ingrese cantidad de dinero: ");
        }
        let tokens = money / this.tokenValue;
        let tokensActuales = this.player.getTokens();
        this.player.setTokens(tokensActuales + tokens);
        console.log(`Usted compró ${tokens} fichas`);
    }
    Welcome(player) {
        return `Bienvenido ${player.getName}  ${player.getSurname} `;
    }
    Age() {
        let age = readlineSync.questionInt("Ingrese su edad:");
        return age;
    }
    login() {
        let age = this.Age();
        if (age >= 18 && age < 100) {
            let name = readlineSync.question("Ingrese su nombre: ");
            let surname = readlineSync.question("Ingrese su apellido: ");
            let mail = readlineSync.questionEMail("Ingrese su email:");
            let player = new jugador_1.Player(name, surname, age, mail);
            this.newPlayer(player);
        }
        else {
            console.log("Usted es menor de edad, no puede ingresar a jugar");
        }
    }
    newPlayer(player) {
        this.player = player;
    }
    getPlayer() {
        return this.player;
    }
}
exports.Casino = Casino;
