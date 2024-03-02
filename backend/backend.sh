#!/usr/bin/bash
# Install MySQL
sudo apt-get update
sudo apt-get install mysql-server

# Install Python and pip (if not already installed)
sudo apt-get install python3
sudo apt-get install python3-pip

# Install Flask and Flask-CORS
pip3 install Flask
pip3 install Flask-CORS

# Install Sendmail
sudo apt-get install sendmail

# Install SQLAlchemy
pip3 install SQLAlchemy

# Optional: Install MySQL driver for SQLAlchemy
pip3 install mysql-connector-python

# Optional: Install additional packages for email handling
pip3 install secure-smtplib

# Note: Make sure to configure MySQL and set up your Flask and SQLAlchemy environment as needed.

sudo service mysql start;

echo "CREATE DATABASE IF NOT EXISTS workhubconnect_db;
CREATE USER IF NOT EXISTS 'workhub_user'@'localhost' IDENTIFIED BY '123';
GRANT ALL PRIVILEGES ON workhubconnect_db.* TO 'workhub_user'@'localhost';
GRANT SELECT ON performance_schema.* TO 'workhub_user'@'localhost';
FLUSH PRIVILEGES;" | sudo mysql -u root -p


cat sql_dumps/backup_workhubconnect02032024.sql | sudo mysql -u root -p workhubconnect_db