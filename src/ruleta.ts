import * as readlineSync from 'readline-sync';
import { Juego } from './juego';
import { Jugador } from './jugador';
import clear from 'clear';
import * as color from "colorette";


export class Ruleta extends Juego {
  private color: string[];
  private colorApostado: string;
  private numeroApostado: number;
  private numeroGanador: number;
  private colorGanador: string;
  private modalidadElegida: string;

  constructor(nombre: string, apuestaMinima: number) {
    super(nombre, apuestaMinima)
    this.color = [color.red('Rojo'),color.green('Verde'), color.gray('Negro')]
    this.colorApostado = '';
    this.numeroApostado = 0;
    this.numeroGanador = 0;
    this.colorGanador= '';
    this.modalidadElegida = '';
  }


private setNumeroApostado(): void{
  let numeroCorrecto = false;
  let numero: number = 0;
  while(numeroCorrecto == false){
    numero = readlineSync.questionInt('Ingrese numero al que desea apostar: '); 
    if(numero >= 0 && numero <= 36){
      this.numeroApostado = numero;
      numeroCorrecto = true;
    }else {
      console.log(color.red('Por favor ingrese un número entre 0 y 36'));
    }
  }
  
}

private setColorApostado(): void {
  let colorIndex: number = readlineSync.keyInSelect(this.color);
  this.colorApostado = this.color[colorIndex];
}
//CALCULA EL COLOR GANADOR
  private calcularColorGanador(): string{
    const numero = Math.floor(Math.random()*3);
    const colorGanador = this.color[numero];
    return colorGanador;
  }
//CALCULA EL NUMERO GANADOR
  private calcularNumeroGanador(): number{
    const numero = Math.floor(Math.random()*36);
    return numero;
  }
//GIRA LA RULETA Y ASIGNA RESULTADOS
  private girarRuleta(): void {
    console.log(color.green('Girando Ruelta...'));
    this.numeroGanador = this.calcularNumeroGanador();
    this.colorGanador = this.calcularColorGanador();
    console.log(`Ha salido el ${this.numeroGanador} ${this.colorGanador}`);
  }

  public esGanador(): number{
    let resultado = '';
    if(this.modalidadElegida === 'Color'){
      if(this.colorGanador === this.colorApostado){
        resultado = 'Gano';
        console.log(color.green(`Ud. ha ganado!. Se suman a su poso + ${this.montoApostado}`))
      }else if(this.colorGanador !== this.colorApostado && this.colorGanador === 'Verde'){
        console.log(color.bgBlue(`Usted no ganó ni perdió.`));
      }else{
        resultado = 'Perdio';
        console.log(color.red('Usted perdió'));
      }
    }else if(this.modalidadElegida === 'Numero'){
      if(this.numeroGanador === this.numeroApostado){
        resultado = 'Gano';
        console.log(color.green('Ha ganado'))
      }else if(this.numeroGanador !== this.numeroApostado && this.numeroGanador === 0){
        console.log(color.blue('Usted no ganó ni perdió'))
      }else{
        resultado = 'Perdio';
        console.log(color.red('Usted perdió'));
      }
    }else{
      if(this.numeroGanador === this.numeroApostado && this.colorGanador === this.colorApostado){
        resultado = 'Gano';
        console.log(color.green('Ha ganado'))
      }else if(this.numeroGanador === this.numeroApostado || this.colorGanador === this.colorApostado){
        resultado = 'noGanoNoPerdio';
        console.log(color.blue('Usted no ganó ni perdió'))
      }else{
        resultado = 'Perdio';
        console.log(color.red('Usted perdió'));
      }
    }
    return this.sumarDescontarPremio(resultado, this.montoApostado);
  }


  private mostrarMenuApuesta(){
    console.log('Seleccione la modalidad en la que quiere apostar');
    const opciones: string[] = ['Color', 'Numero', 'Ambas'];
    let opcionElegida: number = readlineSync.keyInSelect(opciones);
    this.modalidadElegida = opciones[opcionElegida];
    switch(opcionElegida){
      case 0:
        this.setColorApostado();
        break;
      case 1:
        this.setNumeroApostado();
        break;
      default:
        this.setColorApostado()
        this.setNumeroApostado();
        break;
    }
    this.girarRuleta();
  }

  public ejecutar(): number {
    this.mostrarMenuApuesta();
    this.esGanador();
    return this.montoGanado;
  }

  public jugar(jugador: Jugador): void {
    let jugar = true;
      while(jugar) {
        this.setMontoApostado(jugador);
        let montoGanado = this.ejecutar();
        jugador.setDineroDisponible(montoGanado);
        console.log(`Su saldo actual es de ${jugador.getDineroDisponible()}`)
        const respuesta = readlineSync.keyInYNStrict('Desea seguir jugando? ');
        if(respuesta == false){
          jugar = false;
        }
        clear();
      }
  }
}
