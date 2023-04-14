"use strict";
exports.__esModule = true;
exports.Juego = void 0;
var Juego = /** @class */ (function () {
    function Juego(pName, pMinBet, pProbWinning) {
        this.name = pName;
        this.minBet = pMinBet;
        this.probWinning = pProbWinning;
    }
    Juego.prototype.getName = function () {
        return this.name;
    };
    Juego.prototype.setName = function (pName) {
        this.name = pName;
    };
    Juego.prototype.getMinBet = function () {
        return this.minBet;
    };
    Juego.prototype.setMinBet = function (pMinBet) {
        this.minBet = pMinBet;
    };
    Juego.prototype.getProbWinning = function () {
        return this.probWinning;
    };
    Juego.prototype.setProbWinning = function (pProbWinning) {
        this.probWinning = pProbWinning;
    };
    return Juego;
}());
exports.Juego = Juego;
