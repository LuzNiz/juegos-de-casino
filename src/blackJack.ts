import { Game } from "./game";


export class Blackjack extends Game{

    private cards : number;
    private tableNum: number;
    private cantCards: number;
    private cantPlayer: number;
    



    constructor (pTableNum: number, pCantCards: number ,pCantPlayer: number, pCards: number){
        super("BlackJack", 100 , 3, 4)
        this.tableNum= pTableNum;
        this.cantCards = pCantCards;
        this.cantPlayer = pCantPlayer
        this.cards = pCards
        

    }
    public dealCards(): number {
      let cards = Math.random();
      this.cards = (this.cards * 21) + 1
      return this.cards;
    }
   }
   

