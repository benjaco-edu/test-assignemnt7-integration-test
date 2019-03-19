https://github.com/datsoftlyngby/soft2019spring-test/blob/master/Assignments/07%20Integration%20Testing%20Assignment.pdf


### Test with external

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









---


I saw using a lot of time researching sql lite as an in memmory database, but at the end I ditched it, here is why:

The sql queries and the way it runs differs to much, sql lite do not have datatypes, so the same sql statements could not be used.
The create script did not work because of the datatypes, and sqlite relies on a special column called rowid, and have no autoincrement for other columns,
