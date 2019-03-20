# Test Assignemnt 7 - Integration test

https://github.com/datsoftlyngby/soft2019spring-test/blob/master/Assignments/07%20Integration%20Testing%20Assignment.pdf

Testing database with

- mock - test/mockDatabase.js
- sqlite memory - sqliteMemoryDatabase.js
- sqlite file - sqliteFileDatabase.js
- self starting/removing docker database - dockerDatabase.js

The needed code for the bank eksampel can be found ad app/*.js

In app/sqlExecuters/*.js can the database strategies be found, both with same "interface", both can be used interchangeable. I created them with the ES& template literal syntax to to get a really nice syntax for a prepare statement.

I created a database helper for docker to test against a real mysql database, it starts a docker container, makes it ready, and deletes it again when the test is over. Found at test/dockerDB.js

Because of the docker database, there is no docker image to run this assigment with one command (yes, you can bind a docker socket into a docker container or install docker in the container, but are not doing that this time, got some network issues that i didnt want to deal with)

To test with external database (ex3), run following script to start op the external database.

```
sudo docker run --rm --name my_mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=pass1234 -d mysql
sudo docker exec -it my_mysql bash
echo "Following is inside the container"
apt-get update
echo "You might have to retry next command"
mysql -u root -ppass1234 -e " \
create database bank;  \
use bank;  \
create table accounts  \
(  \
  id      int auto_increment primary key ,  \
  balance double(11, 2)  \
);  \
create table creditcards  \
(  \
  id            int auto_increment primary key ,  \
  account       int,  \
  last_used     datetime,  \
  pin           char(4),  \
  blocked       bool,  \
  wrongAttempts int  \
);  \
"
mysql -u root -ppass1234 -e "ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'pass1234'"
```

To run the code, you have to have node and docker installed, and installed the packages with `npm i`

The tests can be executed with `sudo npm test`, sudo is required to be able to talk with the docker socket.