import { Juego } from "./juego";
import * as color from "colorette";

export abstract class Tragamonedas extends Juego{
  protected numeros : number[]

    constructor(nombre: string, apuestaMinima: number) {
      super(nombre, apuestaMinima);
      this.numeros = [];
    }
    
    public abstract girar(): void;
}