# An Implementation of a Blockchain-based Health Service in Hyperledger Fabric
This project uses Hyperledger Fabric 1.4.3 in the implemention.

**Prerequisites in accordance with hyperledger fabric v1.4 documentation**  (https://hyperledger-fabric.readthedocs.io/en/release-1.4/prereqs.html )
1. curl latest version
2. docker version 17.06.2-ce or greater
3. docker compose version 1.14.0 or greater
4. golang version 1.11.x
5. nodejs version 8.x
6. npm version 5.x
7. python

'Basic network' in the fabric samples can be used in setting up of the fabric environment.  
  
 Let install the prerequisites.  
```
  cd /client/
  ./prereqs.sh 
 ```  
 Let rebuild a new environment by setting up the fabric network.  
```
  cd /client    
  ./start.sh     
 ```  
 Let install and instantiate the chaincode to interact with the ledger.  
```
  cd /client  
  ./startHealthService.sh    
 ```  
Client application interacts with the fabric network and the deployed chaincode through Software Development Kit(SDK).     Hyperledger fabric currently provides the node.js and java with official support. The Hyperledger Fabric SDK for Node.js provides a powerful API to interact with the Hyperledger Fabric blockchain.  

Start the following client applications in the *client* directory.  
```
node server.js   
 ``` 
 ```
node serverPatient.js alice  
 ```  
 ```
node serverDoctor.js bob     
 ``` 

