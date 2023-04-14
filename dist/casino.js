"use strict";
exports.__esModule = true;
exports.Casino = void 0;
var juego_1 = require("../src/game");
var jugador_1 = require("../src/jugador");
var readlineSync = require("readline-sync");
var Casino = /** @class */ (function () {
    function Casino(pName, pTokenValue, pMinTokens) {
        this.name = pName;
        this.tokenValue = pTokenValue;
        this.minTokens = pMinTokens;
        this.game = new juego_1.Juego;
        this.player = this.getPlayer();
    }
    Casino.prototype.getName = function () {
        return this.name;
    };
    Casino.prototype.buyTokens = function () {
        var money = readlineSync.questionInt("Ingrese cantidad de dinero: ");
        while (money < this.tokenValue) {
            console.log("Por favor ingrese un monto mayor a ".concat(this.tokenValue, " "));
            money = readlineSync.questionInt("Ingrese cantidad de dinero: ");
        }
        var tokens = money / this.tokenValue;
        var tokensActuales = this.player.getTokens();
        this.player.setTokens(tokensActuales + tokens);
        console.log("Usted compr\u00F3 ".concat(tokens, " fichas"));
    };
    Casino.prototype.Welcome = function (player) {
        return "Bienvenido ".concat(player.getName, "  ").concat(player.getSurname, " ");
    };
    Casino.prototype.Age = function () {
        var age = readlineSync.questionInt("Ingrese su edad:");
        return age;
    };
    Casino.prototype.login = function () {
        var age = this.Age();
        if (age >= 18 && age < 100) {
            var name_1 = readlineSync.question("Ingrese su nombre: ");
            var surname = readlineSync.question("Ingrese su apellido: ");
            var mail = readlineSync.questionEMail("Ingrese su email:");
            var player = new jugador_1.Player(name_1, surname, age, mail);
            this.newPlayer(player);
        }
        else {
            console.log("Usted es menor de edad, no puede ingresar a jugar");
        }
    };
    Casino.prototype.newPlayer = function (player) {
        this.player = player;
    };
    Casino.prototype.getPlayer = function () {
        return this.player;
    };
    return Casino;
}());
exports.Casino = Casino;
