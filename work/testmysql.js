let db = require("../app/sqlExecuters/Mysql");



(async () => {

    let con = new db();
    await con.connect({
        host: 'localhost',
        user: 'root',
        password: 'pass1234',
        database: 'bank'
    });


    console.log(await con.query`insert into accounts (balance) values (${6})`);

    console.log(await con.query`select * from accounts`)


})();