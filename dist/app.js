"use strict";
exports.__esModule = true;
var readlineSync = require("readline-sync");
var casino_1 = require("../src/casino");
var casino = new casino_1.Casino("Las vegas", 20);
console.log("Bienvenido al casino ".concat(casino.getName()));
casino.iniciarSesion();
var cantidadDeFichas = casino.getPlayer().getTokens();
console.log("Ud cuenta con ".concat(cantidadDeFichas, " fichas actualmente. Necesita un minimo de 50 fichas para poder jugar"));
var comprarfichas = readlineSync.keyInYNStrict("Desea comprar fichas?");
if (comprarfichas) {
    casino.buyTokens();
    console.log("Ud cuenta con ".concat(casino.getPlayer().getTokens(), " fichas"));
}
