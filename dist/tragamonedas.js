"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tragamonedas = void 0;
const juego_1 = require("./juego");
class Tragamonedas extends juego_1.Juego {
    constructor(nombre, apuestaMinima) {
        super(nombre, apuestaMinima);
        this.numeros = [];
    }
}
exports.Tragamonedas = Tragamonedas;
