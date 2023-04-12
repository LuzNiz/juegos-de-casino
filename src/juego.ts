export class Juego{
  private name;
  private minBet;
  private probWinning;


  constructor (pName: string, pMinBet: number, pProbWinning: number){
    this.name = pName;
    this.minBet = pMinBet;
    this.probWinning = pProbWinning;
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