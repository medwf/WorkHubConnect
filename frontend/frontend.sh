#!/usr/bin/bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
source ~/.bashrc
nvm install 20.11.1
nvm use 20.11.1
sudo apt install npm
npm install
# npm install react-icons

# install next js :
npm install next
npm install -g next
next -v