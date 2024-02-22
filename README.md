## Installation 

Download and install Ganache, Node 

For installing truffle library which handles deployments of contracts

```
npm install -g truffle
```
## For blockchain

Go to blockchain folder 
```
cd blockchain
```
Copy all contract in contracts folder 
Compile the contracts to check any errors. 

```
truffle compile
```
Setup ganache RPC configuration Change the settings accordingly

```
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "1337",       // Any network (default: none)
    },
```
Migrate the contracts on ganache blockchain 

```
truffle migrate
```

## For Frontend

Go to frontend

```
cd frontend
```
Install dependencies 

```
npm i
```
Run the frontend React server

```
npm run start
```

Visit the application at [http://localhost:3000](http://localhost:3000)

## For Backend

Go to backend 

```
cd backend
```

Setup .env file in backend root directory

```
PORT=4000
DB_URI=mongodb://127.0.0.1:27017
company_privateKey=your_company_private_key
contractAddress=your_contract_address
userWalletAddress=user_wallet_address
RPC_URL="http://127.0.0.1:7545"
company_name="Company Name"
```

Install dependencies 

```
npm i
```
Register the comp  

