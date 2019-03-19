create database bank;
use bank;

create table accounts
(
  id      int auto_increment primary key ,
  balance double(11, 2)
);

create table creditcards
(
  id            int auto_increment primary key ,
  account     int,
  last_used     datetime,
  pin           char(4),
  blocked       bool,
  wrongAttempts int
);