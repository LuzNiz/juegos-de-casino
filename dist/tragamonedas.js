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
exports.Tragamonedas = void 0;
const game_1 = require("./game");
const color = __importStar(require("colorette"));
class Tragamonedas extends game_1.Game {
    constructor(name, apuestaMinima) {
        super(name, apuestaMinima);
        this.numeros = [];
    }
    girar() {
        const resultado1 = Math.floor(Math.random() * 5);
        const resultado2 = Math.floor(Math.random() * 5);
        const resultado3 = Math.floor(Math.random() * 5);
        this.numeros.push(resultado1, resultado2, resultado3);
        console.log(`
      ----------
      ${color.red(resultado1)} | ${color.green(resultado2)} | ${color.blue(resultado3)} |
      ----------
      `);
    }
}
exports.Tragamonedas = Tragamonedas;
