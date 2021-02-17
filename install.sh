sudo apt-get install -y nodejs gnupg


wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -

echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list


sudo apt-get update


sudo apt-get install -y mongodb-org

cd backEnd

npm install

npm install mongoose express dotenv nodemon cors

cd ..

cd frontEnd

npm install --save bootstrap

npm install axios