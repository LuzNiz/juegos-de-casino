import * as readline from 'readline-sync';


export class Ruleta {
  private num: number[];
  private color: string[];

  constructor() {
    this.num = []//1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    this.color = []

  }

  public play(): void {

    console.log('¡Bienvenido/a al juego de Ruleta!');
    const bet = readline.question('Por favor, realice su apuesta (Numero o color): ');
    const money = parseInt(readline.question('Por favor, escriba el monto que desea apostar:  '));

    for (let i = 0; i < 10; i++) {// inicializo, mientras se cumpl la condicion ++ 
      this.num.push(i); //empuja el numero
      if ((i >= 1 && i <= 5)) {
        this.color.push('Rojo');
      } else {
        this.color.push('Negro');
      }
    }

    if (this.num.concat(parseInt(bet))) { //parseInt: devuelve el entero
      const numWin = this.spin();
      if (parseInt(bet) === numWin) {
        console.log(`Has ganado $${money * 10}. Felicidades!`);
      } else {
        console.log(`El número ganador es ${numWin}. Has perdido tu apuesta $${money}.`);
      }
    } else if (this.color.concat(bet.toLowerCase())) {
      const winColor = this.color[this.spin()];
      if (bet.toLowerCase() === winColor) {
        console.log(`Has ganado $${money}!Felicidades`);
      } else {
        console.log(`El color ganador es ${winColor}. Has perdido $${money}.`);
      }
    } else {
      console.log('Apuesta invalida.');
    }
  }

  private spin(): number {
    console.log('Girando la ruleta. Aguarde un momento...');
    const winNum = Math.floor(Math.random() * 10);
    console.log(`Ha salido ${winNum} (${this.color[winNum]}).`);
    return winNum;
  }

}
const ruleta1 = new Ruleta();
ruleta1.play();