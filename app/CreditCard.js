const Account = require("./Account");


class CreditCard {
    constructor() {

        /**
         * @type {Number}
         * @private
         */
        this._id = null;
        /**
         * @type {Account}
         * @private
         */
        this._account = null;
        /**
         * @type {Date}
         * @private
         */
        this._lastUsed = null;
        /**
         * @type {String}
         * @private
         */
        this._pin = null;
        /**
         * @type {boolean}
         * @private
         */
        this._blocked = false;
        /**
         * @type {number}
         * @private
         */
        this._wrongAttempts = 0;


        this.setId = this.setId.bind(this);
        this.getId = this.getId.bind(this);
        this.setAccount = this.setAccount.bind(this);
        this.getAccount = this.getAccount.bind(this);
        this.setLastUsed = this.setLastUsed.bind(this);
        this.getLastUsed = this.getLastUsed.bind(this);
        this.setPinCode = this.setPinCode.bind(this);
        this.getPinCode = this.getPinCode.bind(this);
        this.setWrongPinCodeAttempts = this.setWrongPinCodeAttempts.bind(this);
        this.getWrongPinCodeAttempts = this.getWrongPinCodeAttempts.bind(this);
        this.addWrongPinCodeAttempt = this.addWrongPinCodeAttempt.bind(this);
        this.resetWrongPinCodeAttempt = this.resetWrongPinCodeAttempt.bind(this);
        this.setBlocked = this.setBlocked.bind(this);
        this.isBlocked = this.isBlocked.bind(this);
    }

    /**
     * @param {Number} id
     */
    setId(id) {
        if (id !== parseInt(id)) {
            throw new Error("Id has to be a whole number")
        }
        this._id = id;
    }

    /**
     * @returns {Number}
     */
    getId(){
        return this._id;
    }

    /**
     * @param {Account} account
     */
    setAccount(account){
        if (!account instanceof Account) {
            throw new Error("account has to be an Account object")
        }
        this._account = account;
    }

    /**
     * @returns {Account}
     */
    getAccount(){
        return this._account;
    }

    /**
     * @param {Date} date
     */
    setLastUsed(date){
        if (!date instanceof Date) {
            throw new Error("date has to be a Date object")
        }
        this._lastUsed = date;
    }

    /**
     * @returns {Date}
     */
    getLastUsed(){
        return this._lastUsed;
    }

    /**
     * @param {String} pinCode
     */
    setPinCode(pinCode){
        if (typeof pinCode !== "string" || pinCode.length !== 4) {
            throw new Error("Pincode has to be a 4 char string")
        }
        this._pin = pinCode;
    }

    /**
     * @returns {String}
     */
    getPinCode(){
        return this._pin;
    }

    /**
     * @param {Number} attempts
     */
    setWrongPinCodeAttempts(attempts){
        if (attempts !== parseInt(attempts) || attempts < 0) {
            throw new Error("Attempts has to be a positive integer")
        }
        this._wrongAttempts = attempts;
    }

    /**
     * @returns {number}
     */
    getWrongPinCodeAttempts(){
        return this._wrongAttempts;
    }

    addWrongPinCodeAttempt(){
        this._wrongAttempts++;
    }
    resetWrongPinCodeAttempt(){
        this._wrongAttempts = 0;
    }

    /**
     * @param {Boolean} blocked
     */
    setBlocked(blocked){
        if (typeof blocked !== "boolean") {
            throw new Error("Blocked has to be a boolean")
        }
        this._blocked = blocked;
    }

    /**
     * @returns {boolean}
     */
    isBlocked(){
        return this._blocked;
    }

    /**
     * @returns {boolean}
     */
    hasAccount(){
        return this._account !== null;
    }

    static fromRow(cardElement) {
        let creditcard = new CreditCard();

        creditcard._id = cardElement.id;
        creditcard._account = cardElement.account;
        creditcard._lastUsed = cardElement.last_used;
        creditcard._pin = cardElement.pin;
        creditcard._blocked = cardElement.blocked;
        creditcard._wrongAttempts = cardElement.wrongAttempts;


        return creditcard;
    }
}

module.exports = CreditCard;