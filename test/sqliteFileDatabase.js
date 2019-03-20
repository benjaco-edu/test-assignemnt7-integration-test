const chai = require('chai');
const expect = chai.expect;
const Account = require('./../app/Account');
const DataMapper = require('./../app/DataMapper');
const Sqllite = require('../app/sqlExecuters/Sqlite');
const fs = require("fs");


describe("sqlite file", function () {
    let db;
    before(async  () => {
        db = new Sqllite(); // memory is the default in my
        try {
            fs.unlinkSync("sqlite_test_db");
        } catch (e) {
        }
        await db.createDatabase("sqlite_test_db");

        await db.query`
create table accounts
(
  id      INTEGER PRIMARY KEY AUTOINCREMENT ,
  balance double(11, 2)
);
`;
        await db.query`
create table creditcards
(
  id            INTEGER PRIMARY KEY AUTOINCREMENT ,
  account     int,
  last_used     datetime,
  pin           char(4),
  blocked       bool,
  wrongAttempts int
);
`;
    });
    beforeEach(async () => {
        await db.query`DELETE FROM accounts`;
        await db.query`DELETE FROM creditcards`;
    });


    it("saves and retrieves account", async function () {

        let dataMapper = new DataMapper();
        dataMapper.setDataSource(db.query);

        let account = new Account(10);
        await dataMapper.createAccount(account);

        console.log(account);

        account.setBalance(5);
        await dataMapper.updateAccount(account);

        let getAccount = await dataMapper.getAccount(account.getId());
        expect(getAccount.getBalance()).to.be.equal(5);
        console.log(getAccount);
    });
});