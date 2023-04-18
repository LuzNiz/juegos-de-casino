"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.availableMoney = 0;
    }
    //GETTERS AND SETTERS
    getFirstName() { return this.firstName; }
    ;
    setFirstName(firstName) { this.firstName = firstName; }
    ;
    getLastName() { return this.lastName; }
    ;
    setLastName(lastName) { this.lastName = lastName; }
    ;
    getvailableMoney() { return this.availableMoney; }
    ;
    setAvailableMoney(money) { this.availableMoney = money; }
    ;
    //METODO QUE RETORNA AL JUGADOR
    showData() { return this; }
    ; //¿Necesario?
}
exports.Player = Player;
