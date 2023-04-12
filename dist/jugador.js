"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(pName, pSurname, pAge, pMail) {
        this.name = pName;
        this.surname = pSurname;
        this.age = pAge;
        this.mail = pMail;
        this.tokens = 50;
    }
    getName() {
        return this.name;
    }
    setName(pName) {
        this.name = pName;
    }
    getSurname() {
        return this.surname;
    }
    setSurname(pSurname) {
        this.surname = pSurname;
    }
    getAge() {
        return this.age;
    }
    setAge(pAge) {
        this.age = pAge;
    }
    getMail() {
        return this.mail;
    }
    setMail(pMail) {
        this.mail = pMail;
    }
    getTokens() {
        return this.tokens;
    }
    setTokens(pTokens) {
        this.tokens = pTokens;
    }
    showData() {
        return this;
    }
}
exports.Player = Player;
