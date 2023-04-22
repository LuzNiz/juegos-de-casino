import { Player } from "./player";

export interface iPlay{
    play(player : Player): void;
    isWin(): number;
}