import { Casino } from './casino';
import { Jugador } from './jugador';
import { Blackjack } from './blackjack';
import { Ruleta } from './ruleta';
import * as readlineSync from 'readline-sync';
import * as fs from 'fs';
import clear from 'clear';
import {TragamonedaProgresivo } from './tragamonedasProgresivo';
import {TragamonedaEstandar } from './tragamonedaEstandar';
import * as color from "colorette"

const casino = new Casino("Las vegas", 18); //LINEA QUE INSTANCIA EL CASINO

//URL DE LOS ARCHIVOS .TXT
const urlBienvenida: string = "../files/welcome.txt";
const urlInfoJuegos: string = "../files/infoJuegos.txt";
const urlInfoRuleta: string = "../files/infoRuleta.txt";
const urlInfoBlackjack: string = "../files/infoBlackJack.txt";
const urlInfoTragamonedas: string = "../files/infoTragamonedas.txt";
const urlInfoTragamonedasEstandar: string = "../files/infoTragamonedasEstandar.txt";
const urlInfoTragamonedasProgresiva: string = "../files/infoTragamonedasProgresivo.txt";

//FUNCION QUE USA EL MODULO CLEAR DE NODE PARA BORRAR LA CONSOLA
function borrarConsola():void{
    clear();
}

//FUNCION QUE USA EL MODULO FS PARA LEER ARCHIVOS .TXT
function leerArchivo(urlArchivo: string): string { //Ingresa url del archivo por parametro
    let textoDeArchivo: string = fs.readFileSync(urlArchivo, 'utf-8'); //utilizo el metodo readFileSync del modulo fs
    return textoDeArchivo; //Retorno el texto leído del archivo
}

//FUNCION PARA DARLE LA BIENVENIDA AL JUGADOR
function darBienvenida(nombre: string): void { //Recibo el nombre del jugador por parametro
    let mensajeBienvenida: string = leerArchivo(urlBienvenida); //Leo las reglas del casino desde archivo txt
    console.log(mensajeBienvenida);
    let mensajePersonalizado: string = `Bienvenido ${nombre} al casino ${casino.getNombreCasino()}`; //Creo un mensaje personalizado
    console.log(mensajePersonalizado);
}

//FUNCION QUE MUESTRA EL MENU PRINCIPAL (JUGAR - COBRAR PREMIOS - SALIR)
function mostrarMenuPrincipal(jugador: Jugador): void {
    let listaOpcionesPrincipales: string[] = ['Jugar','Cobrar premios'];
    let opcionElegida: number = readlineSync.keyInSelect(listaOpcionesPrincipales);
    if (opcionElegida === 0) {
        borrarConsola();
        let infoJuegos: string = leerArchivo(urlInfoJuegos);
        console.log(infoJuegos);
        mostrarMenuJuegos(jugador)
    } else if (opcionElegida === 1) {
        borrarConsola();
        casino.transferirPremio(jugador);
        mostrarMenuPrincipal(jugador);
    } else if (opcionElegida === -1) {
        borrarConsola();
        console.log(despedirJugador());
    }
}

//FUNCION QUE MUESTRA EL MENU JUEGOS (BLACKJACK - RULETA- TRAG. PROGRESIVO - TRAG. ESTANDAR) AL JUGADOR
function mostrarMenuJuegos(jugador: Jugador): void {
    console.log(color.red('Seleccione el juego que quiere jugar'));
    let listaDeJuegos: string[] = [color.blue('BlackJack'),color.red('Ruleta'), color.yellow('Tragamonedas'),color.magenta('Volver')]; //Declaro en un array las opciones
    let opcionElegida: number = readlineSync.keyInSelect(listaDeJuegos); //Le paso al modulo keyInSelect el array
    seleccionarJuego(jugador, opcionElegida);
}

//FUNCIÓN QUE LE PREGUNTA AL JUGADOR SI QUIERE JUGAR AL JUEGO SELECCIONADO O VOLVER AL MENU
function quiereSalir(jugador: Jugador): boolean {
    let salir: boolean = false;
    let opcionSeleccionada: number = readlineSync.keyInSelect([color.green('Jugar'), color.red('Volver')]);
    if(opcionSeleccionada === 1){
        salir = true;
    }else if (opcionSeleccionada !== 0){
        mostrarMenuJuegos(jugador);
    }
    return salir;
}

//FUNCION QUE MUESTRA LAS REGLAS DE CADA JUEGO DEPENDIENDO DEL SELECCIONADO
function mostrarReglas( juego : Ruleta | Blackjack | TragamonedaEstandar | TragamonedaProgresivo): void{
    borrarConsola();
    if(juego instanceof Ruleta){
        console.log(leerArchivo(urlInfoRuleta));
    }else if(juego instanceof Blackjack){
        console.log(leerArchivo(urlInfoBlackjack));
    }else if(juego instanceof TragamonedaEstandar){
        console.log(leerArchivo(urlInfoTragamonedasEstandar));
    }else{
        console.log(leerArchivo(urlInfoTragamonedasProgresiva));
    }
}

//FUNCION QUE PERMITE EJECUTAR EL JUEGO SELECCIONADO
function seleccionarJuego(jugador: Jugador, opcionElegida: number): void {
        if (opcionElegida === 0) {
            mostrarReglas(casino.getBlackJack());
            if(quiereSalir(jugador)){
                borrarConsola();
                mostrarMenuJuegos(jugador);
            }else{
                casino.getBlackJack().jugar(jugador);
                borrarConsola();
                mostrarMenuJuegos(jugador);
            }
        } else if (opcionElegida === 1) {
            mostrarReglas(casino.getRuleta());
            if(quiereSalir(jugador)){
                borrarConsola();
                mostrarMenuJuegos(jugador);
            }else{
                casino.getRuleta().jugar(jugador);
                borrarConsola();
                mostrarMenuJuegos(jugador);
            }
        } else if (opcionElegida === 2) {
            borrarConsola();
            console.log(leerArchivo(urlInfoTragamonedas));
            console.log('Selecciono Tragamonedas. Por favor seleccione el tipo de tragamonedas con el que quiere jugar');
            let listaTragamonedas: string[] = [color.blue('Tragamonedas Estandar'), color.red('Tragamonedas Progresivo'),color.green('Volver')];
            let opcionSeleccionada: number = readlineSync.keyInSelect(listaTragamonedas);
            if (opcionSeleccionada === 0) {
                mostrarReglas(casino.getTragamonedasEstandar());
                if(quiereSalir(jugador)){
                    borrarConsola();
                    mostrarMenuJuegos(jugador);
                }else{
                    borrarConsola();
                    casino.getTragamonedasEstandar().jugar(jugador);
                    mostrarMenuJuegos(jugador);
                }
            }else if(opcionSeleccionada === 1){
                mostrarReglas(casino.getTragamonedasProgresivo());
                if(quiereSalir(jugador)){
                    borrarConsola();
                    mostrarMenuJuegos(jugador);
                }else{
                    borrarConsola();
                    casino.getTragamonedasProgresivo().jugar(jugador)
                    mostrarMenuJuegos(jugador);
                }
            }else if(opcionSeleccionada === 2){
                borrarConsola();
                mostrarMenuJuegos(jugador)
            }else{
                borrarConsola();
                mostrarMenuPrincipal(jugador);
            }
        }else if(opcionElegida === 3){
            borrarConsola();
            mostrarMenuPrincipal(jugador);
        }else{
            borrarConsola();
            mostrarMenuPrincipal(jugador);
        }
}

//FUNCION QUE PERMITE INGRESAR DINERO SI EL JUGADOR NO CUENTA CON EL VALOR SUFICIENTE PARA APOSTAR
export function saldoInsuficiente(jugador : Jugador): void {
    let respuesta: boolean = readlineSync.keyInYNStrict('¿Desea ingresar mas dinero?');
    if(respuesta){
        ingresarDinero(jugador);
    }else{
        mostrarMenuPrincipal(jugador);
    }
}

//FUNCION PARA INGRESAR DINERO
export function ingresarDinero(jugador: Jugador): void {
    let esValido: boolean = false;
    while(esValido == false){ 
        let dinero: number = readlineSync.questionInt('Ingrese el monto de dinero: ');
        if(dinero !== 0 && dinero > 0 && dinero < 1000000){
            jugador.setDineroDisponible(dinero);
            borrarConsola();
            jugador.mostrarSaldo();
            esValido = true;
        }else{
            console.log(color.red('Ingrese un monto mayor a $0 y menor a $1.000.000'));
        }
    }
};

//FUNCION QUE PREGUNTA EL NOMBRE
function preguntarNombre (): string {
    let esValido: boolean = false;
    const regex = /[~`!@#$%\^&*()\-_=+\[\]{}\\|;:",<.>\/?\d]/;
    let nombre: string = '';
    while(esValido == false){
        nombre = readlineSync.question('Ingrese su nombre: ');
        if(!regex.test(nombre)){
            esValido = true;
        }else {
            console.log(color.red('El nombre no puede contener números ni caracteres especiales'));
        }
    }
    return nombre;
};

//FUNCION QUE INSTANCIA UN NUEVO JUGADOR
function nuevoJuegador(): Jugador {
    let nombre: string = preguntarNombre();
    let jugador: Jugador = new Jugador(nombre);
    return jugador;
};

//FUNCION QUE DESPIDE AL JUGADOR
export function despedirJugador(): string{
    return "Apreciamos su participación en nuestro casino y esperamos recibir su visita nuevamente. ¡Gracias por jugar con nosotros!"
};

//FUNCION PARA CORRER LA APLICACION
export function main(): void {
    borrarConsola();
    const acceso: boolean = casino.verificarAcceso(); //Valido la edad ingresada
    if (acceso) { //Si cumple con la edad minima:
        let jugador: Jugador = nuevoJuegador(); //Instancio un nuevo jugador
        darBienvenida(jugador.getNombre()); //Le doy la bienvenida
        ingresarDinero(jugador);
        mostrarMenuPrincipal(jugador); //Corro la función para que el jugador juege
    } else {
        console.log(color.red(`Lamentablemente, debido a las restricciones de edad, no es posible que juegues en nuestro casino si eres menor de ${casino.getEdadMinimaPermitida()} años.`));
    }
};




