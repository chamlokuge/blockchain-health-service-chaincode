rm -rf wallet

echo "Removing key from key store..."

rm -rf ./hfc-key-store

# Remove chaincode docker image
docker rmi -f dev-peer0.org1.example.com-mycc-1.0-384f11f484b9302df90b453200cfb25174305fce8f53f4e94d45ee3b6cab0ce9
sleep 2

cd ../basic-network
./teardown.sh
./stop.sh
./start.sh

# Now launch the CLI container in order to install, instantiate chaincode
# and prime the ledger with our 10 cars
docker-compose -f ./docker-compose.yml up -d cli
docker ps -a

sleep 2

cd ../client

echo 'Enrolling Admin...'

node enrollAdmin.js

echo 'Registering User..'

node registerUser.js alice
node registerUser.js bob

echo 'All Good..'
echo 'It is also possible to use API server for querying or invoking apicalls .. Run *node server.js user * and then use localhost:7080'

