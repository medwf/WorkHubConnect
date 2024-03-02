#!/usr/bin/bash
# Install MySQL
sudo apt-get update
sudo apt-get install mysql-server

# Install Python and pip (if not already installed)
sudo apt-get install python3
sudo apt-get install python3-pip

# Install Flask and Flask-CORS, flasgger, flask_jwt_extended
pip3 install Flask
pip3 install Flask-CORS
pip3 install flasgger
pip3 install flask_jwt_extended

#Install magic
pip3 install python-magic

# Install Sendmail
sudo apt-get install sendmail

# Install SQLAlchemy
pip3 install SQLAlchemy

# Optional: Install MySQL driver for SQLAlchemy
pip3 install mysql-connector-python
pip install pymysql

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


#ERROR
	# /WorkHubConnect/backend/models/engine/db_storage.py", line 37, in __init__
	#    self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}?charset=utf8mb4'.
	#   File "<string>", line 2, in create_engine
	#   ...
	#   ModuleNotFoundError: No module named 'MySQLdb'
	
#SOLUTION :
	# In the file /WorkHubConnect/backend/models/engine/db_storage.py 
	# In this line  : self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}?charset=utf8mb4'.
	# Change : mysql+mysqldb by mysql+pymysql
