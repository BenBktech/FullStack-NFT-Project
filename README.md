# FullStack NFT Project BackEnd

## Deploy the smart contract

### On Hardhat local Blockchain

#### To launch a hardhat node
```
yarn hardhat node --no-deploy
```
#### To deploy on hardhat local Blockchain
```
yarn hardhat deploy --network localhost
```
### On Goerli Testnet
```
yarn hardhat deploy --network goerli
```

## Tips 

You don't need to know this if you only do a "npm install" to run the project.

BUT, if you create the project from scratch, it's important to do a :
npm i -D @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers
Recently hardhat team made @nomiclabs/hardhat-ethers itself extensible so my plan is to update hardhat-deploy-ethers to extend it instead of being a fork of it. No timeline yet though.

So in package.json we will have the following line : 
"@nomiclabs/hardhat-ethers": "npm:hardhat-deploy-ethers@^0.3.0-beta.13",