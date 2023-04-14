import { Casino } from "./casino";

 export class Game {
  private name: string;
  private minBet: number;
  private probWinning: number;
 private  amountPlayer: number;


  constructor (pName: string, pMinBet: number, pProbWinning: number, pAmountPlayer:number){
    this.name = pName;
    this.minBet = pMinBet;
    this.probWinning = pProbWinning;
    this.amountPlayer= pAmountPlayer;
  }
  
  public getName(): string{
    return this.name
  }
  public setName(pName:string): void{
    this.name = pName;
  }
  public getMinBet(): number{
    return this.minBet;
  }
  public setMinBet(pMinBet:number): void{
    this.minBet = pMinBet;

  }public getProbWinning(): number{
    return this.probWinning
  }
  public setProbWinning(pProbWinning:number): void{
    this.probWinning = pProbWinning;

  }
} 