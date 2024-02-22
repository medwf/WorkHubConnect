note
app key for gmail:
"avvv ogen hzzu mypj"
export EMAIL_PASSWORD="avvv ogen hzzu mypj"
cat sql_dumps/setup_mysql_database.sql | sudo mysql -uroot -p
cat cat backup_workhubconnect20022024.sql | sudo mysql -uroot -p workhubconnect_db
WORKHUB_MYSQL_USER="workhub_user" WORKHUB_MYSQL_PWD="123" WORKHUB_MYSQL_HOST="localhost" WORKHUB_MYSQL_DB="workhubconnect_db"
WORKHUB_MYSQL_USER="workhub_user" WORKHUB_MYSQL_PWD="123" WORKHUB_MYSQL_HOST="localhost" WORKHUB_MYSQL_DB="workhubconnect_db" python3
WORKHUB_MYSQL_USER="workhub_user" WORKHUB_MYSQL_PWD="123" WORKHUB_MYSQL_HOST="localhost" WORKHUB_MYSQL_DB="workhubconnect_db" python3 -m api.v1.app
find . -type d -name '__pycache__' -exec rm -r {} +


WORKHUB_MYSQL_USER="workhub_user" WORKHUB_MYSQL_PWD="123" WORKHUB_MYSQL_HOST="localhost" WORKHUB_MYSQL_DB="workhubconnect_db" python3 -m auth.authen


# install nodejs vesrsion 20 :
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
source ~/.bashrc
nvm install 20.11.1
nvm use 20.11.1
sudo apt install npm
npm install react-icons
npm install

install next js :
    npm install next
    npm install -g next
    next -v

run frontend : 
    - npm run dev 


