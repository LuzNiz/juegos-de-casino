import { Game } from "./game";
import * as color from "colorette";

export abstract class Tragamonedas extends Game{
  protected numeros : number[]

    constructor(name: string, apuestaMinima: number) {
      super(name, apuestaMinima);
      this.numeros = [];
    }
    
    protected girar(): void {
      const resultado1 = Math.floor(Math.random() * 5);
      const resultado2 = Math.floor(Math.random() * 5);
      const resultado3 = Math.floor(Math.random() * 5);
      this.numeros.push(resultado1, resultado2, resultado3);

      console.log(`
      ----------
      ${color.red(resultado1)} | ${color.green(resultado2)} | ${color.blue(resultado3)} |
      ----------
      `);
    }
}