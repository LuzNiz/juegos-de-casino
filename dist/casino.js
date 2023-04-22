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
    constructor(name, minimumAgeAllowed) {
        this.casinoName = name;
        this.minimumAgeAllowed = minimumAgeAllowed;
        this.roulette = new ruleta_1.Ruleta("Ruleta", 1000);
        this.blackjack = new blackjack_1.Blackjack("BlackJack", 400);
        this.tragamonedaProgresivo = new tragamonedasProgresivo_1.TragamonedaProgresivo('Tragamoneda Progresiva', 1000);
        this.tragamonedaEstandar = new tragamonedaEstandar_1.TragamonedaEstandar('Tragamonedas Estandar', 500);
    }
    //GETTERS AND SETTERS
    getCasinoName() { return this.casinoName; }
    ;
    setCasinoName(casinoName) { this.casinoName = casinoName; }
    ;
    getMinimumAgeAllowed() { return this.minimumAgeAllowed; }
    setMinimumAgeAllowed(minimumAgeAllowed) { this.minimumAgeAllowed = minimumAgeAllowed; }
    ;
    getBlackJack() { return this.blackjack; }
    getRuleta() { return this.roulette; }
    getTragamonedasProgresivo() { return this.tragamonedaProgresivo; }
    getTragamonedasEstandar() { return this.tragamonedaEstandar; }
    //METODO PARA VERIFICAR SI CUMPLE CON LOS REQUISITOS DE EDAD PARA INGRESAR
    provideAccess() {
        let ifAccess = false;
        let access = false;
        while (!ifAccess) {
            const regex = /[~`!@#$%\^&*()\-_=+\[\]{}\\|;:",<.>\/?]/;
            const ageStr = readlineSync.question('Por favor, ingrese su edad: ');
            if (!regex.test(ageStr)) {
                const age = Number(ageStr);
                if (age !== 0 && age <= 99) {
                    if (ageStr.startsWith('0')) {
                        console.log(color.red('Ingrese una edad sin 0s a la izquierda'));
                    }
                    else {
                        if (age >= this.minimumAgeAllowed) {
                            access = true;
                            ifAccess = true;
                        }
                        ifAccess = true;
                    }
                }
                else {
                    console.log(color.red('Por favor, ingrese una edad mayor a 0 y menor a 99 años'));
                }
            }
        }
        return access;
    }
    cobrarPremio(player) {
        if (player.getvailableMoney() > 0) {
            console.log(`Le hemos transferido $ ${player.getvailableMoney()}`);
            player.setAvailableMoney(0);
        }
        else {
            console.log(color.red('Usted no tiene dinero para cobrar'));
        }
    }
}
exports.Casino = Casino;
