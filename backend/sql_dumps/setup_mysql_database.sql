-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS workhubconnect_db;
CREATE USER IF NOT EXISTS 'workhub_user'@'localhost' IDENTIFIED BY '123';
GRANT ALL PRIVILEGES ON `workhubconnect_db`.* TO 'workhub_user'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'workhub_user'@'localhost';
FLUSH PRIVILEGES;