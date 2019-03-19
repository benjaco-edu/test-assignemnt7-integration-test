let db = require("../app/sqlExecuters/Sqllite");



(async () => {

    let con = new db();
    await con.createDatabase();


    await con.query`
create table accounts
(
  id      INTEGER PRIMARY KEY AUTOINCREMENT ,
  balance double(11, 2)
);
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


    console.log(await con.query`insert into accounts (balance) values (${6})`);
    console.log(await con.query`insert into accounts (balance) values (${6})`);
    console.log(await con.query`insert into accounts (balance) values (${6})`);
    console.log(await con.query`insert into accounts (balance) values (${6})`);
    console.log(await con.query`insert into accounts (balance) values (${6})`);

    console.log(await con.query`select * from accounts`)


})();