import { iJugar } from "./iJugar";
import { Jugador } from "./jugador";
import { saldoInsuficiente } from "./main";
import * as color from "colorette";

export abstract class Juego implements iJugar{
    private nombreJuego: string;
    private apuestaMinima: number;
    protected montoApostado: number;
    protected montoGanado: number

    public constructor(nombreJuego: string, apuestaMinima: number){
        this.nombreJuego = nombreJuego;
        this.apuestaMinima = apuestaMinima;
        this.montoGanado = 0;
        this.montoApostado = 0;
    }
    //GETTERS AND SETTERS
    public getNombreJuego(): string {return this.nombreJuego}
    public getApuestaMinima(): number{return this.apuestaMinima};
    public getMontoGanado():number  {return this.montoGanado};

    //GUARDA EL MONTO DE LA APUESTA
    public setMontoApostado(jugador: Jugador) {
        let apuestaValida = false;
        while(apuestaValida == false){
            let apuesta = jugador.apostar();
            if(this.validarMontoApostado(apuesta, jugador)){
                this.montoApostado = apuesta;
                apuestaValida = true;
            }else{
            console.log('Ingrese nuevamente su apuesta ');
            }   
        }
    }    
    //VALIDA EL MONTO APOSTADO
    public validarMontoApostado(montoApostado: number, jugador : Jugador): boolean{
        let esValido = false;
        let dineroDisponible = jugador.getDineroDisponible();
        if(montoApostado > 0 && montoApostado <= dineroDisponible && montoApostado >= this.apuestaMinima){
            esValido = true;
        }else if(montoApostado < this.apuestaMinima){
            console.log(color.red(`La apuesta mínima es de $ ${this.apuestaMinima}`));
        }else if(montoApostado > dineroDisponible){
            console.log(color.red(`No tiene suficiente dinero disponible. El dinero disponible es $ ${dineroDisponible}`));
            saldoInsuficiente(jugador);
        }else{
            console.log(color.red('El monto apostado no puede ser $0 ni negativo'));
        }
        return esValido;
    }

    //SUMA O DESCUENTA EL PREMIO SEGÚN EL RESULTADO DEL JUEGO
    public sumarDescontarPremio(resultado: string, dinero: number): number{
        this.montoGanado = 0;
        if(resultado === 'Gano'){
            this.montoGanado += dinero;
            this.montoApostado = 0;
        }else if(resultado === 'Perdio') {
            this.montoGanado -= this.montoApostado;
            this.montoApostado = 0;
        }else if(resultado === 'noGanoNoPerdio'){
            this.montoApostado = 0;
        }
        return this.montoGanado;
    }

    //IMPLEMENTA METODO JUGAR() DE LA INTERFAZ QUE SERA MODIFICADO POR LAS CLASES HIJAS
    public abstract jugar(jugador : Jugador): void

    //IMPLEMENTA METODO ESGANADOR() DE LA INTERFAZ QUE SERA MODIFICADO POR LAS CLASES HIJAS
    public abstract esGanador(): number;
}