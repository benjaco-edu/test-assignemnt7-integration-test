const chai = require('chai');
const expect = chai.expect;
const Account = require('./../app/Account');
const DataMapper = require('./../app/DataMapper');
const Mysql = require('./../app/sqlExecuters/Mysql');
const DockerDB = require("./dockerDB");

describe("docker database", function () {
    this.timeout(0);
    let db;
    let dockerDB = new DockerDB(__dirname + "/../setup.sql");

    before(async  () => {
        db = new Mysql();
        await dockerDB.createDatabase();
        await db.connect(dockerDB.connectionDetails);
    });


    after(async () => {
        await dockerDB.kill();
    });

    beforeEach(async () => {
        await db.query`TRUNCATE accounts`;
        await db.query`TRUNCATE creditcards`;
    });


    it("Databases", async function () {

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