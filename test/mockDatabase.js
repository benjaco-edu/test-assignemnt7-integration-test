const chai = require('chai');
const expect = chai.expect;
const Account = require('./../app/Account');
const DataMapper = require('./../app/DataMapper');
const Mysql = require('./../app/sqlExecuters/Mysql');
const sinon = require('sinon');


it("Mock database", async function () {
    let mysql = new Mysql;
    let databaseMock = sinon.mock(mysql);


    databaseMock.expects("query").withArgs(
        ['insert into accounts (balance) \n                             values (', ')'], 10
    ).returns(Promise.resolve({
        fieldCount: 0,
        affectedRows: 1,
        insertId: 1,
        info: '',
        serverStatus: 2,
        warningStatus: 0
    }));

    databaseMock.expects("query").withArgs(
        ['update accounts set balance = ', ' where id = ', ''], 5, 1
    ).returns(Promise.resolve({
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        info: 'Rows matched: 1  Changed: 1  Warnings: 0',
        serverStatus: 2,
        warningStatus: 0,
        changedRows: 1
    }));

    databaseMock.expects("query").withArgs(
        ['select * from accounts where id = ', ''], 1
    ).returns(Promise.resolve([{
        id: 1,
        balance: 5
    }]));


    let dataMapper = new DataMapper();
    dataMapper.setDataSource(mysql.query);

    let account = new Account(10);
    await dataMapper.createAccount(account);

    console.log(account);

    account.setBalance(5);
    await dataMapper.updateAccount(account);

    let getAccount = await dataMapper.getAccount(account.getId());
    expect(getAccount.getBalance()).to.be.equal(5);
    console.log(getAccount);
});