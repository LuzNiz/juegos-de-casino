import { Player } from "./player";
import { Game } from "./game";
import * as readlineSync from 'readline-sync';
import * as fs from 'fs';

export class Casino {
    private name: string;
    private minimumMoney: number;
    private minimumAgeAllowed: number;
    

    public constructor(name: string, cantidadMinFichas : number, minimumAgeAllowed: number){
        this.name = name;
        this.minimumMoney = cantidadMinFichas;
        this.minimumAgeAllowed = minimumAgeAllowed;
    }
    
    //GETTERS AND SETTERS

    public getName(): string {return this.name};
    public setName(name: string): void{ this.name = name};

    public getMinimumMoney(): number { return this.minimumMoney}
    public setMinimumMoney(minimumMoney: number): void {this.minimumMoney = minimumMoney};

    private provideAccess(age: number): boolean{
        let access = false;
        if(age >= this.minimumAgeAllowed){
            access = true;
        }
        return access;
    }

    private readFile(file: string): string {
        let text = fs.readFileSync(file, 'utf-8');
        return text;
    }    

    private welcome(name: string): void{
        let messagePropio = `Bienvenido ${name} al casino ${this.name}`;
        //let welcomeMessage = this.readFile("./files/welcome.txt");
        console.log(messagePropio);
        //console.log(welcomeMessage);
    }

    private selectGame() {
        let juegos: string[] = ['BlackJack', 'Ruleta', 'Tragamonedas'];
        let option: number = readlineSync.keyInSelect(juegos);
        if(option === 0){
            console.log('Selecciono BlackJack')
            //let blackjack: BlackJack = new BlackJack()
        }else if(option === 1){
            console.log('Selecciono Ruleta')
            //let ruleta: Ruleta = new ruleta();
        }else if(option === 2) {
            console.log('Selecciono Tragamonedas')
            let type = ['Tragamonedas regular', 'Tragamonedas Progresivo']
            let tipo = readlineSync.keyInSelect(type);
            if(tipo === 1){
                //let tragamonedas1 = new Tragamonedas1;
            }
        }
    }

    public play(){
        //let infoJuegos = this.readFile('./files/infoJuegos.txt');
        let money = readlineSync.questionInt('Ingrese el monto de dinero con el que desea jugar: ');
        this.selectGame();
    }

    public app(){
        let age = readlineSync.questionInt('Por favor, ingrese su edad: ');
        let access = this.provideAccess(age);
        if(access){
            let firstName = readlineSync.question('Ingrese su nombre: ');
            let lastName = readlineSync.question('Ingrese su apellido: ');
            let player = new Player(firstName, lastName, age);
            this.welcome(firstName);
            this.play();
        }else {
            console.log('Usted es menor de edad. No puede jugar en este casino');
        }
    }

}