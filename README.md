# schain-info-builder
collect chains.json and transform the data
searches and filters the data for the chains you add or (blank == all)


run 
```console
npm install
```

run with chain names (ex. honorable-steel-rasalhague)
```console
node mainnetEndpoints.js <chain1> <chain2>
```

Outputs:
 ```
 [
  {
    "schain": {
      "chain_name": <<chain>>,
      "chain_id": hex | dec",
      "explorer": "https://<<chain>>.explorer.mainnet.skalenodes.com"
    },
    "nodes": [
      {
        "id": ,
        "name": ,
        "http_endpoint_ip": ,
        "https_endpoint_ip": 
      }
      ...
      }
 ]
```
