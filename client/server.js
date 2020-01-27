const express = require('express')
const bodyParser = require('body-parser');

const { FileSystemWallet } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const app = express()
const port = 3000

app.use(bodyParser.json());

app
.post('/pubkey', 
(req, res) => 
    {

        console.log(req.body);
        saveToWallet(req.body);
        res.send("success");

    }

)

async function saveToWallet(key){

    const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);

        // Collect input parameters
        // user: who initiates this query, can be anyone in the wallet
        // filename: the file to be validated
        const user = key.username
        const filename = user+"-pub.key"

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists(user);
        if (!userExists) {
            console.log('An identity for the user ' + user + ' does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        else{
            fs.writeFile('wallet/'+user+'/'+filename, key.publicKey, (err) => { 
      
                // In case of a error throw err. 
                if (err) throw err; 
            }) 
        }

}

app.listen(port, () => console.log(`App listening on port ${port}!`))