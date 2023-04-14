import { Game } from "./game";

export class Ruleta extends Game{

    private cantNumeros: number;
    



    constructor(pCantNumeros: number){
      super("Ruleta",50, 2,5)
      this.cantNumeros= pCantNumeros;
      
    }
}