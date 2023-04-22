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
const casino_1 = require("./casino");
const player_1 = require("./player");
const blackjack_1 = require("./blackjack");
const ruleta_1 = require("./ruleta");
const readlineSync = __importStar(require("readline-sync"));
const fs = __importStar(require("fs"));
const clear_1 = __importDefault(require("clear"));
const tragamonedaEstandar_1 = require("./tragamonedaEstandar");
const casino = new casino_1.Casino("Las vegas", 18); //LINEA QUE CREA EL CASINO
main();
const urlWelcome = "../files/welcome.txt";
const urlInfoJuegos = "../files/infoJuegos.txt";
const urlInfoRuleta = "../files/infoRuleta.txt";
const urlInfoBlackjack = "../files/infoBlackJack.txt";
const urlInfoTragamonedas = "../files/infoTragamonedas.txt";
const urlInfoTragamonedasEstandar = "../files/infoTragamonedasEstandar.txt";
const urlInfoTragamonedasProgresiva = "../files/infoTragamonedasProgresivo.txt";
function clearConsole() {
    (0, clear_1.default)();
}
//METODO QUE USA EL MODULO FS PARA LEER ARCHIVOS .TXT
function readFile(urlFile) {
    let readedText = fs.readFileSync(urlFile, 'utf-8'); //utilizo el metodo readFileSync del modulo fs
    return readedText; //Retorno el texto leído del archivo
}
//METODO PARA DARLE LA BIENVENIDA AL JUGADOR
function welcome(name) {
    let welcomeMessage = readFile(urlWelcome); //Leo las reglas del casino desde archivo txt
    console.log(welcomeMessage);
    let personalizedMessage = `Bienvenido ${name} al casino ${casino.getCasinoName()}`; //Creo un mensaje personalizado
    console.log(personalizedMessage);
}
//METODO QUE INSTANCIA LOS JUEGOS DEPENDIENDO DE LA ELECCIÓN DEL JUGADOR
function selectGame(player) {
    console.log('Seleccione el juego que quiere jugar');
    let games = ['BlackJack', 'Ruleta', 'Tragamonedas']; //Declaro en un array las opciones
    let option = readlineSync.keyInSelect(games); //Le paso al modulo keyInSelect el array
    mostrarMenu(player, option);
}
function mostrarReglas(juego) {
    clearConsole();
    if (juego instanceof ruleta_1.Ruleta) {
        console.log(readFile(urlInfoRuleta));
    }
    else if (juego instanceof blackjack_1.Blackjack) {
        console.log(readFile(urlInfoBlackjack));
    }
    else if (juego instanceof tragamonedaEstandar_1.TragamonedaEstandar) {
        console.log(readFile(urlInfoTragamonedasProgresiva));
    }
    else {
        console.log(readFile(urlInfoTragamonedasEstandar));
    }
}
function mostrarMenu(player, option) {
    if (option === 0) {
        mostrarReglas(casino.getBlackJack());
        casino.getBlackJack().play(player);
        clearConsole();
        selectGame(player);
    }
    else if (option === 1) {
        mostrarReglas(casino.getBlackJack());
        casino.getRuleta().play(player);
        clearConsole();
        selectGame(player);
    }
    else if (option === 2) {
        clearConsole();
        console.log('Selecciono Tragamonedas. Por favor seleccione el tipo de tragamonedas con el que quiere jugar');
        let type = ['Tragamonedas Estandar', 'Tragamonedas Progresivo'];
        let typeSlots = readlineSync.keyInSelect(type);
        if (typeSlots === 0) {
            mostrarReglas(casino.getTragamonedasEstandar());
            casino.getTragamonedasEstandar().play(player);
            selectGame(player);
        }
        else if (typeSlots === 1) {
            mostrarReglas(casino.getTragamonedasProgresivo());
            casino.getTragamonedasProgresivo().play(player);
            selectGame(player);
        }
    }
}
//METODO QUE PERMITE SELECCIONAR EL JUEGO
//METODO PARA INGRESAR DINERO
function setMoney(player) {
    let validate = false;
    while (validate == false) {
        let money = readlineSync.questionInt('Ingrese el monto de dinero con el que desea jugar: ');
        if (money !== 0 && money > 0 && money < 1000000) {
            player.setAvailableMoney(money);
            clearConsole();
            player.checkBalance();
            validate = true;
        }
        else {
            console.log('Ingrese un monto mayor a $0 y menor a $1.000.000');
        }
    }
}
//METODO QUE PREGUNTA EL NOMBRE
function askName() {
    let isValido = false;
    const regex = /[~`!@#$%\^&*()\-_=+\[\]{}\\|;:",<.>\/?\d]/;
    let firstName = '';
    while (isValido == false) {
        firstName = readlineSync.question('Ingrese su nombre: ');
        if (!regex.test(firstName)) {
            isValido = true;
        }
        else {
            console.log('El nombre no puede contener números ni caracteres especiales');
        }
    }
    return firstName;
}
//METODO QUE INSTANCIA UN JUGADOR
function newPlayer() {
    let firstName = askName();
    let player = new player_1.Player(firstName);
    return player;
}
//METODO QUE PERMITE A JUGAR AL USUARIO
function play(player) {
    let infoGames = readFile(urlInfoJuegos);
    console.log(infoGames);
    selectGame(player);
}
//METODO QUE DESPIDE AL JUGADOR
function farewell() {
    return "Apreciamos su participación en nuestro casino y esperamos recibir su visita nuevamente. ¡Gracias por jugar con nosotros!";
}
//METODO PARA CORRER LA APLICACION
function main() {
    const access = casino.provideAccess(); //Valido la edad ingresada
    if (access) { //Si cumple con la edad minima:
        let player = newPlayer(); //Instancio un nuevo jugador
        casino.welcome(player.getFirstName()); //Le doy la bienvenida
        setMoney(player);
        play(player); //Corro la función para que el jugador juege
    }
    else {
        console.log(`Lamentablemente, debido a las restricciones de edad, no es posible que juegues en nuestro casino si eres menor de ${casino.getMinimumAgeAllowed()} años.`);
    }
}
