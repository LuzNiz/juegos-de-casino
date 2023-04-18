import { Player } from './player';
import * as readlineSync from 'readline-sync';
import * as fs from 'fs';
import clear from 'clear';
import { errorMonitor } from "events";

export class Casino {
    private casinoName: string;
    private minimumAgeAllowed: number;


    public constructor(name: string, minimumAgeAllowed: number) {
        this.casinoName = name;
        this.minimumAgeAllowed = minimumAgeAllowed;
    }

    //GETTERS AND SETTERS
    public getCasinoName(): string { return this.casinoName };
    public setCasinoName(casinoName: string): void { this.casinoName = casinoName };

    public getMinimumAgeAllowed(): number { return this.minimumAgeAllowed }
    public setMinimumAgeAllowed(minimumAgeAllowed: number): void { this.minimumAgeAllowed = minimumAgeAllowed };

    //METODO PARA BORRAR LA CONSOLA
    private clearConsole():void{
        clear();
    }

    //METODO PARA VERIFICAR SI CUMPLE CON LOS REQUISITOS DE EDAD PARA INGRESAR
    private provideAccess(age: number): boolean {
        let access: boolean = false;
        if (age !== 0 && age >= this.minimumAgeAllowed && age <= 99) { //Verifico si la edad es mayor o igual a la edad minima permitida
            access = true;
        }
        return access;
    }

    //METODO QUE USA EL MODULO FS PARA LEER ARCHIVOS .TXT
    private readFile(file: string): string { //Ingresa url del archivo por parametro
        let readedText: string = fs.readFileSync(file, 'utf-8'); //utilizo el metodo readFileSync del modulo fs
        return readedText; //Retorno el texto leído del archivo
    }

    //METODO PARA DARLE LA BIENVENIDA AL JUGADOR
    private welcome(name: string): void { //Recibo el nombre del jugador por parametro
        let personalizedMessage: string = `Bienvenido ${name} al casino ${this.casinoName}`; //Creo un mensaje personalizado
        console.log(personalizedMessage);
    }

    //METODO QUE PERMITE SELECCIONAR EL JUEGO
    private selectGame(): void {
        console.log('Seleccione el juego que quiere jugar');
        let games: string[] = ['BlackJack', 'Ruleta', 'Tragamonedas']; //Declaro en un array las opciones
        let option: number = readlineSync.keyInSelect(games); //Le paso al modulo keyInSelect el array
        if (option === 0) {
            this.clearConsole();
            console.log('Selecciono BlackJack');
            const reglasBlackJack: string = this.readFile('../files/infoBlackJack.txt');
            console.log(reglasBlackJack);
            //let blackjack: BlackJack = new BlackJack()
        } else if (option === 1) {
            this.clearConsole();
            console.log('Selecciono Ruleta');
            //let ruleta: Ruleta = new ruleta();
        } else if (option === 2) {
            this.clearConsole();
            console.log('Selecciono Tragamonedas. Por favor seleccione el tipo de tragamonedas con el que quiere jugar');
            let type: string[] = ['Tragamonedas regular', 'Tragamonedas Progresivo'];
            let typeSlots: number = readlineSync.keyInSelect(type);
            if (typeSlots === 1) {
                //let tragamonedas1 = new Tragamonedas1;
            }
        }
    }
    //CONSULTAR SALDO
    private checkBalance(player: Player): void{
        console.log(`
        ------------------------------------------------------
        Su saldo actual es de: $ ${player.getvailableMoney()}
        ------------------------------------------------------
        `)
    }

    //METODO PARA INGRESAR DINERO
    private setMoney(player :Player){
        let money: number = readlineSync.questionInt('Ingrese el monto de dinero con el que desea jugar: ');
        if(money !== 0 && money < 1000000){
            player.setAvailableMoney(money);
            this.clearConsole();
            this.checkBalance(player);
        }else{
            throw new Error('Por favor, ingrese un monto mayor a $0 y menor de $1.000.000');
        }
    }

    //METODO QUE INSTANCIA UN JUGADOR
    private newPlayer(): Player {
        let firstName: string = readlineSync.question('Ingrese su nombre: ');
        let lastName: string = readlineSync.question('Ingrese su apellido: ');
        let player: Player = new Player(firstName, lastName);
        return player;
    }

    //METODO QUE PERMITE AL JUGADOR JUGAR
    private play(player: Player): void {
        let infoGames: string = this.readFile('../files/infoJuegos.txt');
        console.log(infoGames);
        this.selectGame();
    }

    //METODO PARA CORRER LA APLICACION
    public app(): void {
        const age: number = readlineSync.questionInt('Por favor, ingrese su edad: '); //Pido al jugador su edad
        const access: boolean = this.provideAccess(age); //Valido la edad ingresada
        if (access) { //Si cumple con la edad minima:
            let player: Player = this.newPlayer(); //Instancio un nuevo jugador
            let welcomeMessage: string = this.readFile("../files/welcome.txt"); //Leo las reglas del casino desde archivo txt
            console.log(welcomeMessage);
            this.welcome(player.getFirstName()); //Le doy la bienvenida
            this.setMoney(player);
            this.play(player); //Corro la función para que el jugador juege
        } else {
            console.log(`Lamentablemente, debido a las restricciones de edad, no es posible que juegues en nuestro casino si eres menor de ${this.minimumAgeAllowed} años.`);
        }
    }

    //MANEJO DE ERRORES
    /*
    try(){
        this.provideAccess(readlineSync.questionInt('Por favor, ingrese su edad: '))
    }catch(err: Error){
        this.provideAccess(readlineSync.questionInt('Por favor, ingrese su edad: '))
        console.error(err);
    } 
    */
}