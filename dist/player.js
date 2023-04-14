"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(firstName, lastName, edad) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.availableMoney = 0;
    }
    //Getters and setters
    getFirstName() {
        return this.firstName;
    }
    setFirstName(firstName) {
        this.firstName = firstName;
    }
    getLastName() {
        return this.lastName;
    }
    setLastName(lastName) {
        this.lastName = lastName;
    }
    getvailableMoney() {
        return this.availableMoney;
    }
    setAvailableMoney(money) {
        this.availableMoney = money;
    }
    showData() {
        return this;
    }
}
exports.Player = Player;
