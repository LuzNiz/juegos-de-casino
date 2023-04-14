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
const player_1 = require("./player");
const readlineSync = __importStar(require("readline-sync"));
const fs = __importStar(require("fs"));
class Casino {
    constructor(name, cantidadMinFichas, minimumAgeAllowed) {
        this.name = name;
        this.minimumMoney = cantidadMinFichas;
        this.minimumAgeAllowed = minimumAgeAllowed;
    }
    //GETTERS AND SETTERS
    getName() { return this.name; }
    ;
    setName(name) { this.name = name; }
    ;
    getMinimumMoney() { return this.minimumMoney; }
    setMinimumMoney(minimumMoney) { this.minimumMoney = minimumMoney; }
    ;
    provideAccess(age) {
        let access = false;
        if (age >= this.minimumAgeAllowed) {
            access = true;
        }
        return access;
    }
    readFile(file) {
        let text = fs.readFileSync(file, 'utf-8');
        return text;
    }
    welcome(name) {
        let messagePropio = `Bienvenido ${name} al casino ${this.name}`;
        //let welcomeMessage = this.readFile("./files/welcome.txt");
        console.log(messagePropio);
        //console.log(welcomeMessage);
    }
    selectGame() {
        let juegos = ['BlackJack', 'Ruleta', 'Tragamonedas'];
        let option = readlineSync.keyInSelect(juegos);
        if (option === 0) {
            console.log('Selecciono BlackJack');
            //let blackjack: BlackJack = new BlackJack()
        }
        else if (option === 1) {
            console.log('Selecciono Ruleta');
            //let ruleta: Ruleta = new ruleta();
        }
        else if (option === 2) {
            console.log('Selecciono Tragamonedas');
            let type = ['Tragamonedas regular', 'Tragamonedas Progresivo'];
            let tipo = readlineSync.keyInSelect(type);
            if (tipo === 1) {
                //let tragamonedas1 = new Tragamonedas1;
            }
        }
    }
    play() {
        //let infoJuegos = this.readFile('./files/infoJuegos.txt');
        let money = readlineSync.questionInt('Ingrese el monto de dinero con el que desea jugar: ');
        this.selectGame();
    }
    app() {
        let age = readlineSync.questionInt('Por favor, ingrese su edad: ');
        let access = this.provideAccess(age);
        if (access) {
            let firstName = readlineSync.question('Ingrese su nombre: ');
            let lastName = readlineSync.question('Ingrese su apellido: ');
            let player = new player_1.Player(firstName, lastName, age);
            this.welcome(firstName);
            this.play();
        }
        else {
            console.log('Usted es menor de edad. No puede jugar en este casino');
        }
    }
}
exports.Casino = Casino;
