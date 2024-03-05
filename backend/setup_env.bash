note
app key for gmail:
"avvv ogen hzzu mypj"
export EMAIL_PASSWORD="avvv ogen hzzu mypj"
SELECT * FROM cities  where name like "%‎%" LIMIT 400
cat sql_dumps/setup_mysql_database.sql | sudo mysql -uroot -p
cat cat backup_workhubconnect20022024.sql | sudo mysql -uroot -p workhubconnect_db
WORKHUB_MYSQL_USER="workhub_user" WORKHUB_MYSQL_PWD="123" WORKHUB_MYSQL_HOST="localhost" WORKHUB_MYSQL_DB="workhubconnect_db"
WORKHUB_MYSQL_USER="workhub_user" WORKHUB_MYSQL_PWD="123" WORKHUB_MYSQL_HOST="localhost" WORKHUB_MYSQL_DB="workhubconnect_db" python3
WORKHUB_MYSQL_USER="workhub_user" WORKHUB_MYSQL_PWD="123" WORKHUB_MYSQL_HOST="localhost" WORKHUB_MYSQL_DB="workhubconnect_db" python3 -m api.v1.app
find . -type d -name '__pycache__' -exec rm -r {} +


WORKHUB_MYSQL_USER="workhub_user" WORKHUB_MYSQL_PWD="123" WORKHUB_MYSQL_HOST="localhost" WORKHUB_MYSQL_DB="workhubconnect_db" python3 -m auth.authen


sudo apt install gunicorn
sudo systemctl daemon-reload
sudo systemctl start gunicorn
WORKHUB_MYSQL_USER="workhub_user" WORKHUB_MYSQL_PWD="123" WORKHUB_MYSQL_HOST="localhost" WORKHUB_MYSQL_DB="workhubconnect_db" gunicorn --bind 0.0.0.0:5000 api.v1.app:app
WORKHUB_MYSQL_USER="workhub_user" WORKHUB_MYSQL_PWD="123" WORKHUB_MYSQL_HOST="localhost" WORKHUB_MYSQL_DB="workhubconnect_db" tmux new-session -d 'gunicorn --bind 0.0.0.0:5000 api.v1.app:app'

#install agent for nginx to add certification config in nginx file (default)
sudo apt-get install python3-certbot-nginx
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install certbot
#sudo certbot certonly --standalone -d workhubconnect.me -d  www.workhubconnect.me -d api.workhubconnect.me
sudo certbot --nginx -d workhubconnect.me -d  www.workhubconnect.me -d api.workhubconnect.me


# install nodejs vesrsion 20 :
sudo apt-get install curl
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



UPDATE users
SET profile_img = CONCAT('workers/electricaltech', id, '.jpg')
WHERE id BETWEEN 1 AND 76;
npm run build

npm install pm2 --save-dev
npx pm2 start npm --name contractverifier -- run dev
npx pm2 start npm --name contractverifier -- run dev -- -p 8080
npx pm2 start npm --name workhubconnect -- start
npx pm2 start npm --name workhubconnect -- start -- -p 8080

npx pm2 stop contractverifier
pm2 restart contractverifier
npx pm2 delete contractverifier
npx pm2 show contractverifier
npx pm2 show workhubconnect

sudo chown -R nginx:nginx /home/aboubakr/alx/WorkHubConnect/frontend
sudo chmod -R 755 /home/aboubakr/alx/WorkHubConnect/frontend
sudo setenforce 0



#change port
#in package.json
 "scripts": {
    "dev": "next dev --port=8080",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },

Workhubconnect.sytes.net
