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
exports.main = exports.despedirJugador = exports.ingresarDinero = exports.saldoInsuficiente = void 0;
const casino_1 = require("./casino");
const jugador_1 = require("./jugador");
const blackjack_1 = require("./blackjack");
const ruleta_1 = require("./ruleta");
const readlineSync = __importStar(require("readline-sync"));
const fs = __importStar(require("fs"));
const clear_1 = __importDefault(require("clear"));
const tragamonedaEstandar_1 = require("./tragamonedaEstandar");
const color = __importStar(require("colorette"));
const casino = new casino_1.Casino("Las vegas", 18); //LINEA QUE INSTANCIA EL CASINO
//URL DE LOS ARCHIVOS .TXT
const urlBienvenida = "../files/welcome.txt";
const urlInfoJuegos = "../files/infoJuegos.txt";
const urlInfoRuleta = "../files/infoRuleta.txt";
const urlInfoBlackjack = "../files/infoBlackJack.txt";
const urlInfoTragamonedas = "../files/infoTragamonedas.txt";
const urlInfoTragamonedasEstandar = "../files/infoTragamonedasEstandar.txt";
const urlInfoTragamonedasProgresiva = "../files/infoTragamonedasProgresivo.txt";
//FUNCION QUE USA EL MODULO CLEAR DE NODE PARA BORRAR LA CONSOLA
function borrarConsola() {
    (0, clear_1.default)();
}
//FUNCION QUE USA EL MODULO FS PARA LEER ARCHIVOS .TXT
function leerArchivo(urlArchivo) {
    let textoDeArchivo = fs.readFileSync(urlArchivo, 'utf-8'); //utilizo el metodo readFileSync del modulo fs
    return textoDeArchivo; //Retorno el texto leído del archivo
}
//FUNCION PARA DARLE LA BIENVENIDA AL JUGADOR
function darBienvenida(nombre) {
    let mensajeBienvenida = leerArchivo(urlBienvenida); //Leo las reglas del casino desde archivo txt
    console.log(mensajeBienvenida);
    let mensajePersonalizado = `Bienvenido ${nombre} al casino ${casino.getNombreCasino()}`; //Creo un mensaje personalizado
    console.log(mensajePersonalizado);
}
//FUNCION QUE MUESTRA EL MENU PRINCIPAL (JUGAR - COBRAR PREMIOS - SALIR)
function mostrarMenuPrincipal(jugador) {
    let listaOpcionesPrincipales = ['Jugar', 'Cobrar premios'];
    let opcionElegida = readlineSync.keyInSelect(listaOpcionesPrincipales);
    if (opcionElegida === 0) {
        borrarConsola();
        let infoJuegos = leerArchivo(urlInfoJuegos);
        console.log(infoJuegos);
        mostrarMenuJuegos(jugador);
    }
    else if (opcionElegida === 1) {
        borrarConsola();
        casino.transferirPremio(jugador);
        mostrarMenuPrincipal(jugador);
    }
    else if (opcionElegida === -1) {
        borrarConsola();
        console.log(despedirJugador());
    }
}
//FUNCION QUE MUESTRA EL MENU JUEGOS (BLACKJACK - RULETA- TRAG. PROGRESIVO - TRAG. ESTANDAR) AL JUGADOR
function mostrarMenuJuegos(jugador) {
    console.log(color.red('Seleccione el juego que quiere jugar'));
    let listaDeJuegos = [color.blue('BlackJack'), color.red('Ruleta'), color.yellow('Tragamonedas'), color.magenta('Volver')]; //Declaro en un array las opciones
    let opcionElegida = readlineSync.keyInSelect(listaDeJuegos); //Le paso al modulo keyInSelect el array
    seleccionarJuego(jugador, opcionElegida);
}
//FUNCIÓN QUE LE PREGUNTA AL JUGADOR SI QUIERE JUGAR AL JUEGO SELECCIONADO O VOLVER AL MENU
function quiereSalir(jugador) {
    let salir = false;
    let opcionSeleccionada = readlineSync.keyInSelect([color.green('Jugar'), color.red('Volver')]);
    if (opcionSeleccionada === 1) {
        salir = true;
    }
    else if (opcionSeleccionada !== 0) {
        mostrarMenuJuegos(jugador);
    }
    return salir;
}
//FUNCION QUE MUESTRA LAS REGLAS DE CADA JUEGO DEPENDIENDO DEL SELECCIONADO
function mostrarReglas(juego) {
    borrarConsola();
    if (juego instanceof ruleta_1.Ruleta) {
        console.log(leerArchivo(urlInfoRuleta));
    }
    else if (juego instanceof blackjack_1.Blackjack) {
        console.log(leerArchivo(urlInfoBlackjack));
    }
    else if (juego instanceof tragamonedaEstandar_1.TragamonedaEstandar) {
        console.log(leerArchivo(urlInfoTragamonedasEstandar));
    }
    else {
        console.log(leerArchivo(urlInfoTragamonedasProgresiva));
    }
}
//FUNCION QUE PERMITE EJECUTAR EL JUEGO SELECCIONADO
function seleccionarJuego(jugador, opcionElegida) {
    if (opcionElegida === 0) {
        mostrarReglas(casino.getBlackJack());
        if (quiereSalir(jugador)) {
            borrarConsola();
            mostrarMenuJuegos(jugador);
        }
        else {
            casino.getBlackJack().jugar(jugador);
            borrarConsola();
            mostrarMenuJuegos(jugador);
        }
    }
    else if (opcionElegida === 1) {
        mostrarReglas(casino.getRuleta());
        if (quiereSalir(jugador)) {
            borrarConsola();
            mostrarMenuJuegos(jugador);
        }
        else {
            casino.getRuleta().jugar(jugador);
            borrarConsola();
            mostrarMenuJuegos(jugador);
        }
    }
    else if (opcionElegida === 2) {
        borrarConsola();
        console.log(leerArchivo(urlInfoTragamonedas));
        console.log('Selecciono Tragamonedas. Por favor seleccione el tipo de tragamonedas con el que quiere jugar');
        let listaTragamonedas = [color.blue('Tragamonedas Estandar'), color.red('Tragamonedas Progresivo'), color.green('Volver')];
        let opcionSeleccionada = readlineSync.keyInSelect(listaTragamonedas);
        if (opcionSeleccionada === 0) {
            mostrarReglas(casino.getTragamonedasEstandar());
            if (quiereSalir(jugador)) {
                borrarConsola();
                mostrarMenuJuegos(jugador);
            }
            else {
                borrarConsola();
                casino.getTragamonedasEstandar().jugar(jugador);
                mostrarMenuJuegos(jugador);
            }
        }
        else if (opcionSeleccionada === 1) {
            mostrarReglas(casino.getTragamonedasProgresivo());
            if (quiereSalir(jugador)) {
                borrarConsola();
                mostrarMenuJuegos(jugador);
            }
            else {
                borrarConsola();
                casino.getTragamonedasProgresivo().jugar(jugador);
                mostrarMenuJuegos(jugador);
            }
        }
        else if (opcionSeleccionada === 2) {
            borrarConsola();
            mostrarMenuJuegos(jugador);
        }
        else {
            borrarConsola();
            mostrarMenuPrincipal(jugador);
        }
    }
    else if (opcionElegida === 3) {
        borrarConsola();
        mostrarMenuPrincipal(jugador);
    }
    else {
        borrarConsola();
        mostrarMenuPrincipal(jugador);
    }
}
//FUNCION QUE PERMITE INGRESAR DINERO SI EL JUGADOR NO CUENTA CON EL VALOR SUFICIENTE PARA APOSTAR
function saldoInsuficiente(jugador) {
    let respuesta = readlineSync.keyInYNStrict('¿Desea ingresar mas dinero?');
    if (respuesta) {
        ingresarDinero(jugador);
    }
    else {
        mostrarMenuPrincipal(jugador);
    }
}
exports.saldoInsuficiente = saldoInsuficiente;
//FUNCION PARA INGRESAR DINERO
function ingresarDinero(jugador) {
    let esValido = false;
    while (esValido == false) {
        let dinero = readlineSync.questionInt('Ingrese el monto de dinero: ');
        if (dinero !== 0 && dinero > 0 && dinero < 1000000) {
            jugador.setDineroDisponible(dinero);
            borrarConsola();
            jugador.mostrarSaldo();
            esValido = true;
        }
        else {
            console.log(color.red('Ingrese un monto mayor a $0 y menor a $1.000.000'));
        }
    }
}
exports.ingresarDinero = ingresarDinero;
;
//FUNCION QUE PREGUNTA EL NOMBRE
function preguntarNombre() {
    let esValido = false;
    const regex = /[~`!@#$%\^&*()\-_=+\[\]{}\\|;:",<.>\/?\d]/;
    let nombre = '';
    while (esValido == false) {
        nombre = readlineSync.question('Ingrese su nombre: ');
        if (!regex.test(nombre)) {
            esValido = true;
        }
        else {
            console.log(color.red('El nombre no puede contener números ni caracteres especiales'));
        }
    }
    return nombre;
}
;
//FUNCION QUE INSTANCIA UN NUEVO JUGADOR
function nuevoJuegador() {
    let nombre = preguntarNombre();
    let jugador = new jugador_1.Jugador(nombre);
    return jugador;
}
;
//FUNCION QUE DESPIDE AL JUGADOR
function despedirJugador() {
    return "Apreciamos su participación en nuestro casino y esperamos recibir su visita nuevamente. ¡Gracias por jugar con nosotros!";
}
exports.despedirJugador = despedirJugador;
;
//FUNCION PARA CORRER LA APLICACION
function main() {
    borrarConsola();
    const acceso = casino.verificarAcceso(); //Valido la edad ingresada
    if (acceso) { //Si cumple con la edad minima:
        let jugador = nuevoJuegador(); //Instancio un nuevo jugador
        darBienvenida(jugador.getNombre()); //Le doy la bienvenida
        ingresarDinero(jugador);
        mostrarMenuPrincipal(jugador); //Corro la función para que el jugador juege
    }
    else {
        console.log(color.red(`Lamentablemente, debido a las restricciones de edad, no es posible que juegues en nuestro casino si eres menor de ${casino.getEdadMinimaPermitida()} años.`));
    }
}
exports.main = main;
;
