const chai = require('chai');
const expect = chai.expect;
const Account = require('./../app/Account');
const DataMapper = require('./../app/DataMapper');
const Mysql = require('./../app/sqlExecuters/Mysql');


it("Try external production database", async  function () {
    let dataMapper = new DataMapper();

    let con = new Mysql();
    await con.connect({
        host: 'localhost',
        user: 'root',
        password: 'pass1234',
        database: 'bank'
    });

    dataMapper.setDataSource(con.query);

    let account = new Account(10);
    await dataMapper.createAccount(account);

    console.log(account);

    account.setBalance(5);
    await dataMapper.updateAccount(account);

    let getAccount = await dataMapper.getAccount(account.getId());
    expect(getAccount.getBalance()).to.be.equal(5);
    console.log(getAccount);
});