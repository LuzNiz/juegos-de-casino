"use strict";
exports.__esModule = true;
exports.Player = void 0;
var Player = /** @class */ (function () {
    function Player(pName, pSurname, pAge, pMail) {
        this.name = pName;
        this.surname = pSurname;
        this.age = pAge;
        this.mail = pMail;
        this.tokens = 50;
    }
    Player.prototype.getName = function () {
        return this.name;
    };
    Player.prototype.setName = function (pName) {
        this.name = pName;
    };
    Player.prototype.getSurname = function () {
        return this.surname;
    };
    Player.prototype.setSurname = function (pSurname) {
        this.surname = pSurname;
    };
    Player.prototype.getAge = function () {
        return this.age;
    };
    Player.prototype.setAge = function (pAge) {
        this.age = pAge;
    };
    Player.prototype.getMail = function () {
        return this.mail;
    };
    Player.prototype.setMail = function (pMail) {
        this.mail = pMail;
    };
    Player.prototype.getTokens = function () {
        return this.tokens;
    };
    Player.prototype.setTokens = function (pTokens) {
        this.tokens = pTokens;
    };
    Player.prototype.showData = function () {
        return this;
    };
    return Player;
}());
exports.Player = Player;
