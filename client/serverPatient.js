var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Setting for Hyperledger Fabric
const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');
const ccpPath = path.resolve(__dirname,'..', 'basic-network', 'connection.json');
let user= process.argv[2];
app.get('/', function (req, res) {
res.sendFile('patientViewRecord.html', { root: __dirname});
});

app.get('/viewRecord/:healthRecordId', async function (req, res) {
    try {
   // Create a new file system based wallet for managing identities.
           const walletPath = path.join(process.cwd(), 'wallet');
           const wallet = new FileSystemWallet(walletPath);
           console.log(`Wallet path: ${walletPath}`);
   // Check to see if we've already enrolled the user.
           const userExists = await wallet.exists(user);
           if (!userExists) {
               console.log('An identity for the user '+user+' does not exist in the wallet');
               console.log('Run the registerUser.js application before retrying');
               return;
           }
   // Create a new gateway for connecting to our peer node.
           const gateway = new Gateway();
           await gateway.connect(ccpPath, { wallet, identity:user, discovery: { enabled: true, asLocalhost: true } });
   // Get the network (channel) our contract is deployed to.
           const network = await gateway.getNetwork('mychannel');
   // Get the contract from the network.
           const contract = network.getContract('mycc');
   // Evaluate the specified transaction.
            // const result = await contract.evaluateTransaction('viewRecord',req.query['healthRecordId']);
             const result = await contract.evaluateTransaction('viewRecord',req.params.healthRecordId);
           console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
           res.status(200).json({response: result.toString()});
           //res.send(result.toString());
   } catch (error) {
           console.error(`Failed to evaluate transaction: ${error}`);
           res.status(500).json({error: error});
           process.exit(1);
       }
   
   });

   app.listen(4000);
   console.log('App is listening on port 4000');
