import { Jugador } from './jugador';
import { Blackjack } from './blackjack';
import { Ruleta } from './ruleta';
import * as readlineSync from 'readline-sync';
import {TragamonedaProgresivo } from './tragamonedasProgresivo';
import {TragamonedaEstandar } from './tragamonedaEstandar';
import * as color from "colorette";

export class Casino {
    private nombreCasino: string;
    private edadMinimaPermitida: number;
    public ruleta :Ruleta;
    public blackjack :Blackjack;
    private tragamonedaProgresivo: TragamonedaProgresivo;
    private tragamonedaEstandar: TragamonedaEstandar;

    //CONSTRUCTOR
    public constructor(nombre: string, edadMinimaPermitida: number) {
        this.nombreCasino = nombre;
        this.edadMinimaPermitida = edadMinimaPermitida;
        this.ruleta = new Ruleta("Ruleta", 1000);
        this.blackjack = new Blackjack("BlackJack", 400);
        this.tragamonedaProgresivo = new TragamonedaProgresivo('Tragamoneda Progresiva',1000);
        this.tragamonedaEstandar = new TragamonedaEstandar('Tragamonedas Estandar',500);
    }

    //GETTERS AND SETTERS
    public getNombreCasino(): string { return this.nombreCasino };
    public setNombreCasino(nombreCasino: string): void { this.nombreCasino = nombreCasino };

    public getEdadMinimaPermitida(): number { return this.edadMinimaPermitida};
    public setEdadMinimaPermitida(edadMinimaPermitida: number): void { this.edadMinimaPermitida = edadMinimaPermitida};

    public getBlackJack(): Blackjack{ return this.blackjack};
    public getRuleta(): Ruleta{ return this.ruleta};
    public getTragamonedasProgresivo(): TragamonedaProgresivo{ return this.tragamonedaProgresivo};
    public getTragamonedasEstandar(): TragamonedaEstandar{ return this.tragamonedaEstandar};

    //METODO PARA VERIFICAR SI CUMPLE CON LOS REQUISITOS DE EDAD PARA INGRESAR
    public verificarAcceso(): boolean {
        let estaPermitido: boolean = false;
        let accesso: boolean = false;
        while(!estaPermitido){
            const regex = /[~`!@#$%\^&*()\-_=+\[\]{}\\|;:",<.>\/?]/;
            const edadString: string = readlineSync.question('Por favor, ingrese su edad: ');
            if(!regex.test(edadString)){
                const edad : number = Number(edadString);
                if (edad !== 0  && edad <= 99 ) { 
                    if(edadString.startsWith('0')){
                        console.log(color.red('Ingrese una edad sin 0s a la izquierda'));
                    }else {
                        if(edad >= this.edadMinimaPermitida){
                            accesso = true;
                            estaPermitido = true;
                        }
                        estaPermitido = true;
                    }
                }else{
                    console.log(color.red('Por favor, ingrese una edad mayor a 0 y menor a 99 años'));
                }
            }
        }
        return accesso;
    }

    public transferirPremio(jugador: Jugador) {
        if(jugador.getDineroDisponible()> 0){
            console.log(color.green(`Le hemos transferido $ ${jugador.getDineroDisponible()}`));
            jugador.reiniciarDineroDisponible();
        }else{
            console.log(color.red('Usted no tiene dinero para cobrar'));
        }
    }
}