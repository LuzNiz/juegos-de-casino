"use strict";
exports.__esModule = true;
exports.Casino = void 0;
var player_1 = require("../src/player");
var readlineSync = require("readline-sync");
var Casino = /** @class */ (function () {
    function Casino(name, tokensValue) {
        this.name = name;
        this.tokensValue = tokensValue;
        this.player = this.getPlayer();
    }
    Casino.prototype.getName = function () {
        return this.name;
    };
    Casino.prototype.buyTokens = function () {
        var money = readlineSync.questionInt("Ingrese cantidad de dinero: ");
        while (money < this.tokensValue) {
            console.log("Por favor ingrese un monto mayor a ".concat(this.tokensValue));
            money = readlineSync.questionInt("Ingrese cantidad de dinero: ");
        }
        var tokens = money / this.tokensValue;
        var tokensActuales = this.player.getTokens();
        this.player.setTokens(tokensActuales + tokens);
        console.log("Usted compr\u00F3 ".concat(tokens, " fichas"));
    };
    Casino.prototype.welcome = function (player) {
        return "Bienvenido ".concat(player.getFirstName, " ").concat(player.getLastName);
    };
    Casino.prototype.pedirEdad = function () {
        var edad = readlineSync.questionInt("Ingrese su edad: ");
        return edad;
    };
    Casino.prototype.iniciarSesion = function () {
        var edad = this.pedirEdad();
        if (edad >= 18 && edad < 95) {
            var firstName = readlineSync.question("Ingrese su nombre: ");
            var lastName = readlineSync.question("Ingrese su apellido: ");
            var email = readlineSync.questionEMail("Ingrese su email: ");
            var player = new player_1.Player(firstName, lastName, edad, email);
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
