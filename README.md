## Installation 

Download and install Ganache, Node 

For installing truffle library which handles deployments of contracts

```
npm install -g truffle
```
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

````
npm i
```
Run the frontend React server

```
npm run start
```

