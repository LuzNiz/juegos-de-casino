import { Jugador } from "./jugador";

export interface iJugar{

    jugar(jugador : Jugador): void;
    esGanador(): number;
}