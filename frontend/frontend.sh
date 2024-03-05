#!/usr/bin/bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash && source ~/.bashrc && nvm install 20.11.1
nvm use 20.11.1
sudo apt install npm
npm install
# npm install react-icons

# install next js :
npm install next
npm install -g next
next -v

# npx pm2 start npm --name contractverifier -- run dev
# npx pm2 delete contractverifier
# npx run dev -H 0.0.0.0
# npx next dev -H 192.168.1.2
# npm run dev -- -H 10.13.1.49