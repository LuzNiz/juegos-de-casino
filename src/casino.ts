import { Player } from './player';
import { Blackjack } from './blackjack';
import { Ruleta } from './ruleta';
import * as readlineSync from 'readline-sync';
import * as fs from 'fs';
import clear from 'clear';
import {TragamonedaProgresivo } from './tragamonedasProgresivo';
import {TragamonedaEstandar } from './tragamonedaEstandar';
import * as color from "colorette";

export class Casino {
    private casinoName: string;
    private minimumAgeAllowed: number;
    public roulette :Ruleta;
    public blackjack :Blackjack;
    private tragamonedaProgresivo: TragamonedaProgresivo;
    private tragamonedaEstandar: TragamonedaEstandar;

    //CONSTRUCTOR
    public constructor(name: string, minimumAgeAllowed: number) {
        this.casinoName = name;
        this.minimumAgeAllowed = minimumAgeAllowed;
        this.roulette = new Ruleta("Ruleta", 1000);
        this.blackjack = new Blackjack("BlackJack", 400);
        this.tragamonedaProgresivo = new TragamonedaProgresivo('Tragamoneda Progresiva',1000);
        this.tragamonedaEstandar = new TragamonedaEstandar('Tragamonedas Estandar',500);
    }

    //GETTERS AND SETTERS
    public getCasinoName(): string { return this.casinoName };
    public setCasinoName(casinoName: string): void { this.casinoName = casinoName };

    public getMinimumAgeAllowed(): number { return this.minimumAgeAllowed }
    public setMinimumAgeAllowed(minimumAgeAllowed: number): void { this.minimumAgeAllowed = minimumAgeAllowed };

    public getBlackJack(): Blackjack{ return this.blackjack}
    public getRuleta(): Ruleta{ return this.roulette}
    public getTragamonedasProgresivo(): TragamonedaProgresivo{ return this.tragamonedaProgresivo}
    public getTragamonedasEstandar(): TragamonedaEstandar{ return this.tragamonedaEstandar}

    //METODO PARA VERIFICAR SI CUMPLE CON LOS REQUISITOS DE EDAD PARA INGRESAR
    public provideAccess(): boolean {
        let ifAccess: boolean = false;
        let access: boolean = false;
        while(!ifAccess){
            const regex = /[~`!@#$%\^&*()\-_=+\[\]{}\\|;:",<.>\/?]/;
            const ageStr: string = readlineSync.question('Por favor, ingrese su edad: ');
            if(!regex.test(ageStr)){
                const age : number = Number(ageStr);
                if (age !== 0  && age <= 99 ) { 
                    if(ageStr.startsWith('0')){
                        console.log(color.red('Ingrese una edad sin 0s a la izquierda'));
                    }else {
                        if(age >= this.minimumAgeAllowed){
                            access = true;
                            ifAccess = true;
                        }
                        ifAccess = true;
                    }
                }else{
                    console.log(color.red('Por favor, ingrese una edad mayor a 0 y menor a 99 años'));
                }
            }
        }
        return access;
    }

    public cobrarPremio(player: Player) {
        if(player.getvailableMoney()> 0){
            console.log(`Le hemos transferido $ ${player.getvailableMoney()}`);
            player.setAvailableMoney(0);
        }else{
            console.log(color.red('Usted no tiene dinero para cobrar'));
        }
    }
}