const CreditCard = require("./CreditCard");
const Account = require("./Account");


class DataMapper {


    constructor() {
        this._dataSource = null;


        this.setDataSource = this.setDataSource.bind(this);


        this.createCreditCard = this.createCreditCard.bind(this);
        this.updateCreditCard = this.updateCreditCard.bind(this);
        this.getCreditCard = this.getCreditCard.bind(this);
        this.getCreditCards = this.getCreditCards.bind(this);
        this.createAccount = this.createAccount.bind(this);
        this.updateAccount = this.updateAccount.bind(this);
        this.getAccount = this.getAccount.bind(this);
        this.getAccounts = this.getAccounts.bind(this);

    }


    setDataSource(value) {
        if (typeof value !== "function") {
            throw new Error("Datasource have to have to be a method")
        }
        this._dataSource = value;
    }


    /**
     * @param {CreditCard} creditCard
     * @return CreditCard
     */
    async createCreditCard(creditCard){
        let stmt = await this._dataSource`insert into creditcards (account, last_used, pin, blocked, wrongAttempts) 
                             values (${creditCard.getAccount()},${creditCard.getLastUsed()},${creditCard.getPinCode()},
                             ${creditCard.isBlocked()},${creditCard.getWrongPinCodeAttempts()})`;
        creditCard.setId(stmt.insertId);
        return creditCard;
    }

    /**
     * @param {CreditCard} creditCard
     * @return CreditCard
     */
    async updateCreditCard(creditCard){
        await this._dataSource`update creditcards set account = ${creditCard.getAccount()}, last_used = ${creditCard.getLastUsed()}, pin = ${creditCard.getPinCode()},
                          blocked = ${creditCard.isBlocked()}, wrongAttempts = ${creditCard.getWrongPinCodeAttempts()} where id = ${creditCard.getId()}`;
        return creditCard;
    }

    /**
     * @param {number} id
     * @return CreditCard
     */
    async getCreditCard(id){
        let card = await this._dataSource`select * from creditcards where id = ${id}`;
        if (card.length !== 1) {
            return null;
        }
        return CreditCard.fromRow(card[0]);
    }

    /**
     * @return CreditCard[]
     */
    async getCreditCards(){
        return (await this._dataSource`select * from creditcards`).map(i => CreditCard.fromRow(i));
    }

    /**
     * @param {Account} account
     * @return Account
     */
    async createAccount(account){
        let stmt = await this._dataSource`insert into accounts (balance) 
                             values (${account.getBalance()})`;
        account.setId(stmt.insertId);
        return account;
    }

    /**
     * @param {Account} account
     */
    async updateAccount(account){
        await this._dataSource`update accounts set balance = ${account.getBalance()} where id = ${account.getId()}`;
        return account;
    }

    /**
     * @param {number} id
     * @return Account
     */
    async getAccount(id){
        let account = await this._dataSource`select * from accounts where id = ${id}`;
        if (account.length !== 1) {
            return null;
        }
        return Account.fromRow(account[0]);
    }

    /**
     * @return Account[]
     */
    async getAccounts(){
        return (await this._dataSource`select * from accounts`).map(i => Account.fromRow(i));
    }



    _hasDataSource() {
        if (this._dataSource === null) {
            throw new Error("No datasource")
        }
    }
}

module.exports = DataMapper;
