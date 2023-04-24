"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jugador = void 0;
const readlineSync = __importStar(require("readline-sync"));
const color = __importStar(require("colorette"));
class Jugador {
    constructor(nombre) {
        this.nombre = nombre;
        this.dineroDisponible = 0;
    }
    //GETTERS AND SETTERS
    getNombre() { return this.nombre; }
    ;
    setNombre(nombre) { this.nombre = nombre; }
    ;
    getDineroDisponible() { return this.dineroDisponible; }
    ;
    setDineroDisponible(dinero) {
        this.dineroDisponible += dinero;
    }
    ;
    reiniciarDineroDisponible() {
        this.dineroDisponible = 0;
    }
    //METODO QUE MUESTRA EL SALDO DEL JUGADOR
    mostrarSaldo() {
        console.log(color.green(`
        ------------------------------------------------------
        Su saldo actual es de: $ ${this.dineroDisponible}
        ------------------------------------------------------
        `));
    }
    apostar() {
        let importe = readlineSync.questionInt('Ingrese el monto que quiere apostar: ');
        let valorApuesta = importe;
        return valorApuesta;
    }
}
exports.Jugador = Jugador;
