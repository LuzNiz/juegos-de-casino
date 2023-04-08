"use strict";
exports.__esModule = true;
exports.Player = void 0;
var Player = /** @class */ (function () {
    function Player(firstName, lastName, edad, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.tokens = 50;
    }
    //Getters and setters
    Player.prototype.getFirstName = function () {
        return this.firstName;
    };
    Player.prototype.setFirstName = function (firstName) {
        this.firstName = firstName;
    };
    Player.prototype.getLastName = function () {
        return this.lastName;
    };
    Player.prototype.setLastName = function (lastName) {
        this.lastName = lastName;
    };
    Player.prototype.getEmail = function () {
        return this.email;
    };
    Player.prototype.setEmail = function (email) {
        this.email = email;
    };
    Player.prototype.getTokens = function () {
        return this.tokens;
    };
    Player.prototype.setTokens = function (tokens) {
        this.tokens = tokens;
    };
    Player.prototype.showData = function () {
        return this;
    };
    return Player;
}());
exports.Player = Player;
