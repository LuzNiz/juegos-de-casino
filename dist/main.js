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
exports.main = exports.setMoney = exports.saldoInsuficiente = void 0;
const casino_1 = require("./casino");
const player_1 = require("./player");
const blackjack_1 = require("./blackjack");
const ruleta_1 = require("./ruleta");
const readlineSync = __importStar(require("readline-sync"));
const fs = __importStar(require("fs"));
const clear_1 = __importDefault(require("clear"));
const tragamonedaEstandar_1 = require("./tragamonedaEstandar");
const color = __importStar(require("colorette"));
const casino = new casino_1.Casino("Las vegas", 18); //LINEA QUE CREA EL CASINO
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
    console.log(color.red('Seleccione el juego que quiere jugar'));
    let games = [color.blue('BlackJack'), color.red('Ruleta'), color.yellow('Tragamonedas'), color.magenta('Volver')]; //Declaro en un array las opciones
    let option = readlineSync.keyInSelect(games); //Le paso al modulo keyInSelect el array
    mostrarMenuJuegos(player, option);
}
function mostrarMenuPrincipal(player) {
    let opciones = ['Jugar', 'Cobrar premios'];
    let opcion = readlineSync.keyInSelect(opciones);
    if (opcion === 0) {
        clearConsole();
        let infoGames = readFile(urlInfoJuegos);
        console.log(infoGames);
        selectGame(player);
    }
    else if (opcion === 1) {
        clearConsole();
        casino.cobrarPremio(player);
        mostrarMenuPrincipal(player);
    }
    else if (opcion === -1) {
        clearConsole();
        console.log(farewell());
    }
}
function quiereSalir(player) {
    let salir = false;
    let opciones = readlineSync.keyInSelect([color.green('Jugar'), color.red('Salir')]);
    if (opciones === 1) {
        salir = true;
    }
    else if (opciones !== 0) {
        selectGame(player);
    }
    return salir;
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
        console.log(readFile(urlInfoTragamonedasEstandar));
    }
    else {
        console.log(readFile(urlInfoTragamonedasProgresiva));
    }
}
function mostrarMenuJuegos(player, option) {
    if (option === 0) {
        mostrarReglas(casino.getBlackJack());
        if (quiereSalir(player)) {
            clearConsole();
            selectGame(player);
        }
        else {
            casino.getBlackJack().play(player);
            clearConsole();
            selectGame(player);
        }
    }
    else if (option === 1) {
        mostrarReglas(casino.getRuleta());
        if (quiereSalir(player)) {
            clearConsole();
            selectGame(player);
        }
        else {
            casino.getRuleta().play(player);
            clearConsole();
            selectGame(player);
        }
    }
    else if (option === 2) {
        clearConsole();
        console.log(readFile(urlInfoTragamonedas));
        console.log('Selecciono Tragamonedas. Por favor seleccione el tipo de tragamonedas con el que quiere jugar');
        let opciones = [color.blue('Tragamonedas Estandar'), color.red('Tragamonedas Progresivo'), color.green('Volver')];
        let opcion = readlineSync.keyInSelect(opciones);
        if (opcion === 0) {
            mostrarReglas(casino.getTragamonedasEstandar());
            if (quiereSalir(player)) {
                clearConsole();
                selectGame(player);
            }
            else {
                clearConsole();
                casino.getTragamonedasEstandar().play(player);
                selectGame(player);
            }
        }
        else if (opcion === 1) {
            mostrarReglas(casino.getTragamonedasProgresivo());
            if (quiereSalir(player)) {
                clearConsole();
                selectGame(player);
            }
            else {
                clearConsole();
                casino.getTragamonedasProgresivo().play(player);
                selectGame(player);
            }
        }
        else if (opcion === 2) {
            clearConsole();
            selectGame(player);
        }
        else {
            clearConsole();
            mostrarMenuPrincipal(player);
        }
    }
    else if (option === 3) {
        clearConsole();
        mostrarMenuPrincipal(player);
    }
    else {
        clearConsole();
        mostrarMenuPrincipal(player);
    }
}
//METODO QUE PERMITE SELECCIONAR EL JUEGO
function saldoInsuficiente(player) {
    let respuesta = readlineSync.keyInYNStrict('¿Desea ingresar mas dinero?');
    if (respuesta) {
        setMoney(player);
    }
    else {
        mostrarMenuPrincipal(player);
    }
}
exports.saldoInsuficiente = saldoInsuficiente;
//METODO PARA INGRESAR DINERO
function setMoney(player) {
    let validate = false;
    while (validate == false) {
        let money = readlineSync.questionInt('Ingrese el monto de dinero: ');
        if (money !== 0 && money > 0 && money < 1000000) {
            player.setAvailableMoney(money);
            clearConsole();
            player.checkBalance();
            validate = true;
        }
        else {
            console.log(color.red('Ingrese un monto mayor a $0 y menor a $1.000.000'));
        }
    }
}
exports.setMoney = setMoney;
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
            console.log(color.red('El nombre no puede contener números ni caracteres especiales'));
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
//METODO QUE DESPIDE AL JUGADOR
function farewell() {
    return "Apreciamos su participación en nuestro casino y esperamos recibir su visita nuevamente. ¡Gracias por jugar con nosotros!";
}
//METODO PARA CORRER LA APLICACION
function main() {
    clearConsole();
    const access = casino.provideAccess(); //Valido la edad ingresada
    if (access) { //Si cumple con la edad minima:
        let player = newPlayer(); //Instancio un nuevo jugador
        welcome(player.getFirstName()); //Le doy la bienvenida
        setMoney(player);
        mostrarMenuPrincipal(player); //Corro la función para que el jugador juege
    }
    else {
        console.log(color.red(`Lamentablemente, debido a las restricciones de edad, no es posible que juegues en nuestro casino si eres menor de ${casino.getMinimumAgeAllowed()} años.`));
    }
}
exports.main = main;
