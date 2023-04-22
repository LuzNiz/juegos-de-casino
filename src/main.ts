import { Casino } from './casino';
import { Player } from './player';
import { Blackjack } from './blackjack';
import { Ruleta } from './ruleta';
import * as readlineSync from 'readline-sync';
import * as fs from 'fs';
import clear from 'clear';
import {TragamonedaProgresivo } from './tragamonedasProgresivo';
import {TragamonedaEstandar } from './tragamonedaEstandar';
import * as color from "colorette"

const casino = new Casino("Las vegas", 18); //LINEA QUE CREA EL CASINO

const urlWelcome: string = "../files/welcome.txt";
const urlInfoJuegos: string = "../files/infoJuegos.txt";
const urlInfoRuleta: string = "../files/infoRuleta.txt";
const urlInfoBlackjack: string = "../files/infoBlackJack.txt";
const urlInfoTragamonedas: string = "../files/infoTragamonedas.txt";
const urlInfoTragamonedasEstandar: string = "../files/infoTragamonedasEstandar.txt";
const urlInfoTragamonedasProgresiva: string = "../files/infoTragamonedasProgresivo.txt";

function clearConsole():void{
    clear();
}

//METODO QUE USA EL MODULO FS PARA LEER ARCHIVOS .TXT
function readFile(urlFile: string): string { //Ingresa url del archivo por parametro
    let readedText: string = fs.readFileSync(urlFile, 'utf-8'); //utilizo el metodo readFileSync del modulo fs
    return readedText; //Retorno el texto leído del archivo
}

//METODO PARA DARLE LA BIENVENIDA AL JUGADOR
function welcome(name: string): void { //Recibo el nombre del jugador por parametro
    let welcomeMessage: string = readFile(urlWelcome); //Leo las reglas del casino desde archivo txt
    console.log(welcomeMessage);
    let personalizedMessage: string = `Bienvenido ${name} al casino ${casino.getCasinoName()}`; //Creo un mensaje personalizado
    console.log(personalizedMessage);
}

//METODO QUE INSTANCIA LOS JUEGOS DEPENDIENDO DE LA ELECCIÓN DEL JUGADOR
function selectGame(player :Player): void {
    console.log(color.red('Seleccione el juego que quiere jugar'));
    let games: string[] = [color.blue('BlackJack'),color.red('Ruleta'), color.yellow('Tragamonedas'),color.magenta('Volver')]; //Declaro en un array las opciones
    let option: number = readlineSync.keyInSelect(games); //Le paso al modulo keyInSelect el array
    mostrarMenuJuegos(player, option);
}

function mostrarMenuPrincipal(player: Player){
    let opciones: string[] = ['Jugar','Cobrar premios'];
    let opcion: number = readlineSync.keyInSelect(opciones);
    if (opcion === 0) {
        clearConsole();
        let infoGames: string = readFile(urlInfoJuegos);
        console.log(infoGames);
        selectGame(player)
    } else if (opcion === 1) {
        clearConsole();
        casino.cobrarPremio(player);
        mostrarMenuPrincipal(player);
    } else if (opcion === -1) {
        clearConsole();
        console.log(farewell());
    }
}

function quiereSalir(player: Player): boolean{
    let salir: boolean = false;
    let opciones = readlineSync.keyInSelect([color.green('Jugar'), color.red('Salir')]);
    if(opciones === 1){
        salir = true;
    }else if (opciones !== 0){
        selectGame(player);
    }
    return salir;
}
function mostrarReglas( juego : Ruleta | Blackjack | TragamonedaEstandar | TragamonedaProgresivo){
    clearConsole();
    if(juego instanceof Ruleta){
        console.log(readFile(urlInfoRuleta));
    }else if(juego instanceof Blackjack){
        console.log(readFile(urlInfoBlackjack));
    }else if(juego instanceof TragamonedaEstandar){
        console.log(readFile(urlInfoTragamonedasProgresiva));
    }else{
        console.log(readFile(urlInfoTragamonedasEstandar));
    }
}

function mostrarMenuJuegos(player: Player, option: number) {
        if (option === 0) {
            mostrarReglas(casino.getBlackJack());
            if(quiereSalir(player)){
                clearConsole();
                selectGame(player);
            }else{
                casino.getBlackJack().play(player);
                clearConsole();
                selectGame(player);
            }
        } else if (option === 1) {
            mostrarReglas(casino.getBlackJack());
            if(quiereSalir(player)){
                clearConsole();
                selectGame(player);
            }else{
                casino.getRuleta().play(player);
                clearConsole();
                selectGame(player);
            }
        } else if (option === 2) {
            clearConsole();
            console.log(readFile(urlInfoTragamonedas));
            console.log('Selecciono Tragamonedas. Por favor seleccione el tipo de tragamonedas con el que quiere jugar');
            let opciones: string[] = [color.blue('Tragamonedas Estandar'), color.red('Tragamonedas Progresivo'),color.green('Volver')];
            let opcion: number = readlineSync.keyInSelect(opciones);
            if (opcion === 0) {
                mostrarReglas(casino.getTragamonedasEstandar());
                if(quiereSalir(player)){
                    clearConsole();
                    selectGame(player);
                }else{
                    clearConsole();
                    casino.getTragamonedasEstandar().play(player);
                    mostrarMenuPrincipal(player);
                }
            }else if(opcion === 1){
                mostrarReglas(casino.getTragamonedasProgresivo());
                if(quiereSalir(player)){
                    clearConsole();
                    selectGame(player);
                }else{
                    clearConsole();
                    casino.getTragamonedasProgresivo().play(player)
                    selectGame(player);
                }
            }else if(opcion === 2){
                clearConsole();
                selectGame(player)
            }else{
                clearConsole();
                mostrarMenuPrincipal(player);
            }
        }else if(option === 3){
            clearConsole();
            mostrarMenuPrincipal(player);
        }else{
            clearConsole();
            mostrarMenuPrincipal(player);
        }
}

//METODO QUE PERMITE SELECCIONAR EL JUEGO
export function saldoInsuficiente(player : Player){
    let respuesta: boolean = readlineSync.keyInYNStrict('¿Desea ingresar mas dinero?');
    if(respuesta){
        setMoney(player);
    }else{
        mostrarMenuPrincipal(player);
    }
}
//METODO PARA INGRESAR DINERO
export function setMoney(player :Player){
    let validate: boolean = false;
    while(validate == false){ 
        let money: number = readlineSync.questionInt('Ingrese el monto de dinero: ');
        if(money !== 0 && money > 0 && money < 1000000){
            player.setAvailableMoney(money);
            clearConsole();
            player.checkBalance();
            validate = true;
        }else{
            console.log(color.red('Ingrese un monto mayor a $0 y menor a $1.000.000'));
        }
    }
}

//METODO QUE PREGUNTA EL NOMBRE
function askName (): string{
    let isValido: boolean = false;
    const regex = /[~`!@#$%\^&*()\-_=+\[\]{}\\|;:",<.>\/?\d]/;
    let firstName: string = '';
    while(isValido == false){
        firstName = readlineSync.question('Ingrese su nombre: ');
        if(!regex.test(firstName)){
            isValido = true;
        }else {
            console.log(color.red('El nombre no puede contener números ni caracteres especiales'));
        }
    }
    return firstName;
}

//METODO QUE INSTANCIA UN JUGADOR
function newPlayer(): Player {
    let firstName: string = askName();
    let player: Player = new Player(firstName);
    return player;
}


//METODO QUE DESPIDE AL JUGADOR
function farewell(): string{
    return "Apreciamos su participación en nuestro casino y esperamos recibir su visita nuevamente. ¡Gracias por jugar con nosotros!"
}

//METODO PARA CORRER LA APLICACION
export function main(): void {
    clearConsole();
    const access: boolean = casino.provideAccess(); //Valido la edad ingresada
    if (access) { //Si cumple con la edad minima:
        let player: Player = newPlayer(); //Instancio un nuevo jugador
        welcome(player.getFirstName()); //Le doy la bienvenida
        setMoney(player);
        mostrarMenuPrincipal(player); //Corro la función para que el jugador juege

    } else {
        console.log(color.red(`Lamentablemente, debido a las restricciones de edad, no es posible que juegues en nuestro casino si eres menor de ${casino.getMinimumAgeAllowed()} años.`));
    }
}




