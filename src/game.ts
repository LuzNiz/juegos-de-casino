import { iPlay } from "./iPlay";
import { Player } from "./player";
import { saldoInsuficiente } from "./main";
import * as color from "colorette";

export abstract class Game implements iPlay{
    private name: string;
    private apuestaMinima: number;
    protected montoApostado: number;
    protected montoGanado: number

    public constructor(name: string, apuestaMinima: number){
        this.name = name;
        this.apuestaMinima = apuestaMinima;
        this.montoGanado = 0;
        this.montoApostado = 0;
    }

    public getName(): string {return this.name}
    public getApuestaMinima(): number{return this.apuestaMinima};
    public getMontoGanado():number  {return this.montoGanado};

      //GUARDA EL MONTO DE LA APUESTA
    public setMontoApostado(player: Player) {
        let apuestaValida = false;
        while(apuestaValida == false){
            let apuesta = player.apostar();
            if(this.validarMontoApostado(apuesta, player)){
                this.montoApostado = apuesta;
                apuestaValida = true;
            }else{
            console.log('Ingrese nuevamente su apuesta ');

            }   
        }
    }    

    public validarMontoApostado(montoApostado: number, player : Player): boolean{
        let esValido = false;
        let dineroDisponible = player.getvailableMoney();
        if(montoApostado > 0 && montoApostado <= dineroDisponible && montoApostado >= this.apuestaMinima){
            esValido = true;
        }else if(montoApostado < this.apuestaMinima){
            console.log(color.red(`La apuesta mínima es de $ ${this.apuestaMinima}`));
        }else if(montoApostado > dineroDisponible){
            console.log(color.red(`No tiene suficiente dinero disponible. El dinero disponible es $ ${dineroDisponible}`));
            saldoInsuficiente(player);
        }else{
            console.log(color.red('El monto apostado no puede ser $0 ni negativo'));
        }
        return esValido;
    }

    public sumarDescontarPremio(resultado: string, dinero: number): number{
        this.montoGanado = 0;
        if(resultado === 'Win'){
            this.montoGanado += dinero;
            this.montoApostado = 0;
        }else if(resultado === 'Lose') {
            this.montoGanado -= this.montoApostado;
            this.montoApostado = 0;
        }else if(resultado === 'noWinNoLose'){
            this.montoApostado = 0;
        }
        return this.montoGanado;
    }

    public play(player : Player): void{

    }
    public isWin(): number{
        return 0;
    }
}