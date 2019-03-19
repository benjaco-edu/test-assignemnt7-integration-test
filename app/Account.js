class Account {


    constructor(balance = 0) {
        /**
         * @type {Number}
         * @private
         */
        this._id = null;
        /**
         * @type {number}
         * @private
         */
        this._balance = 0;

        this.setId = this.setId.bind(this);
        this.getId = this.getId.bind(this);
        this.setBalance = this.setBalance.bind(this);
        this.getBalance = this.getBalance.bind(this);
        this.deposit = this.deposit.bind(this);
        this.withdraw = this.withdraw.bind(this);

        this.setBalance(balance)
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
    getId() {
        return this._id;
    }

    /**
     * @param {Number} balance
     */
    setBalance(balance) {
        if (balance !== parseFloat(balance) || balance < 0) {
            throw new Error("Balance has to be a positive number")
        }
        this._balance = balance;

    }

    /**
     * @returns {number}
     */
    getBalance() {
        return this._balance;
    }

    /**
     * @param {Number} amount
     */
    deposit(amount) {
        if (amount !== parseFloat(amount) || amount < 0) {
            throw new Error("Amount has to be a positive number")
        }

        this.setBalance(this._balance + amount);
    }

    /**
     * @param {Number} amount
     */
    withdraw(amount) {
        if (amount !== parseFloat(amount) || amount < 0) {
            throw new Error("Amount has to be a positive number")
        }

        this.setBalance(this._balance - amount);
    }

    static fromRow(accountElement) {

        let account = new Account();

        account._id = accountElement.id;
        account._balance = accountElement.balance;

        return account;
    }
}

module.exports = Account;