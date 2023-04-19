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
exports.Casino = void 0;
const player_1 = require("./player");
const readlineSync = __importStar(require("readline-sync"));
const fs = __importStar(require("fs"));
const clear_1 = __importDefault(require("clear"));
class Casino {
    constructor(name, minimumAgeAllowed) {
        this.casinoName = name;
        this.minimumAgeAllowed = minimumAgeAllowed;
    }
    //GETTERS AND SETTERS
    getCasinoName() { return this.casinoName; }
    ;
    setCasinoName(casinoName) { this.casinoName = casinoName; }
    ;
    getMinimumAgeAllowed() { return this.minimumAgeAllowed; }
    setMinimumAgeAllowed(minimumAgeAllowed) { this.minimumAgeAllowed = minimumAgeAllowed; }
    ;
    //METODO PARA BORRAR LA CONSOLA
    clearConsole() {
        (0, clear_1.default)();
    }
    //METODO PARA VERIFICAR SI CUMPLE CON LOS REQUISITOS DE EDAD PARA INGRESAR
    provideAccess(age) {
        let access = false;
        if (age !== 0 && age >= this.minimumAgeAllowed && age <= 99) { //Verifico si la edad es mayor o igual a la edad minima permitida
            access = true;
        }
        return access;
    }
    //METODO QUE USA EL MODULO FS PARA LEER ARCHIVOS .TXT
    readFile(file) {
        let readedText = fs.readFileSync(file, 'utf-8'); //utilizo el metodo readFileSync del modulo fs
        return readedText; //Retorno el texto leído del archivo
    }
    //METODO PARA DARLE LA BIENVENIDA AL JUGADOR
    welcome(name) {
        let personalizedMessage = `Bienvenido ${name} al casino ${this.casinoName}`; //Creo un mensaje personalizado
        console.log(personalizedMessage);
    }
    //METODO QUE PERMITE SELECCIONAR EL JUEGO
    selectGame() {
        console.log('Seleccione el juego que quiere jugar');
        let games = ['BlackJack', 'Ruleta', 'Tragamonedas']; //Declaro en un array las opciones
        let option = readlineSync.keyInSelect(games); //Le paso al modulo keyInSelect el array
        if (option === 0) {
            this.clearConsole();
            console.log('Selecciono BlackJack');
            const reglasBlackJack = this.readFile('../files/infoBlackJack.txt');
            console.log(reglasBlackJack);
            //let blackjack: BlackJack = new BlackJack()
        }
        else if (option === 1) {
            this.clearConsole();
            console.log('Selecciono Ruleta');
            //let ruleta: Ruleta = new ruleta();
        }
        else if (option === 2) {
            this.clearConsole();
            console.log('Selecciono Tragamonedas. Por favor seleccione el tipo de tragamonedas con el que quiere jugar');
            let type = ['Tragamonedas regular', 'Tragamonedas Progresivo'];
            let typeSlots = readlineSync.keyInSelect(type);
            if (typeSlots === 1) {
                //let tragamonedas1 = new Tragamonedas1;
            }
        }
    }
    //CONSULTAR SALDO
    checkBalance(player) {
        console.log(`
        ------------------------------------------------------
        Su saldo actual es de: $ ${player.getvailableMoney()}
        ------------------------------------------------------
        `);
    }
    //METODO PARA INGRESAR DINERO
    setMoney(player) {
        let money = readlineSync.questionInt('Ingrese el monto de dinero con el que desea jugar: ');
        if (money !== 0 && money < 1000000) {
            player.setAvailableMoney(money);
            this.clearConsole();
            this.checkBalance(player);
        }
        else {
            throw new Error('Por favor, ingrese un monto mayor a $0 y menor de $1.000.000');
        }
    }
    //METODO QUE INSTANCIA UN JUGADOR
    newPlayer() {
        let firstName = readlineSync.question('Ingrese su nombre: ');
        let lastName = readlineSync.question('Ingrese su apellido: ');
        let player = new player_1.Player(firstName, lastName);
        return player;
    }
    //METODO QUE PERMITE AL JUGADOR JUGAR
    play(player) {
        let infoGames = this.readFile('../files/infoJuegos.txt');
        console.log(infoGames);
        this.selectGame();
    }
    farewell() {
        return "Apreciamos su participación en nuestro casino y esperamos recibir su visita nuevamente. ¡Gracias por jugar con nosotros!";
    }
    //METODO PARA CORRER LA APLICACION
    app() {
        const age = readlineSync.questionInt('Por favor, ingrese su edad: '); //Pido al jugador su edad
        const access = this.provideAccess(age); //Valido la edad ingresada
        if (access) { //Si cumple con la edad minima:
            let player = this.newPlayer(); //Instancio un nuevo jugador
            let welcomeMessage = this.readFile("../files/welcome.txt"); //Leo las reglas del casino desde archivo txt
            console.log(welcomeMessage);
            this.welcome(player.getFirstName()); //Le doy la bienvenida
            this.setMoney(player);
            this.play(player); //Corro la función para que el jugador juege
        }
        else {
            console.log(`Lamentablemente, debido a las restricciones de edad, no es posible que juegues en nuestro casino si eres menor de ${this.minimumAgeAllowed} años.`);
        }
    }
}
exports.Casino = Casino;
