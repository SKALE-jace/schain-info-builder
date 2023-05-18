# schain-info-builder
collect chains.json and transform the data
searches and filters the data for the chains you add or (blank == all)

prepared scripts or compose manually

run 
```console
npm install
```

run with chain-name (ex. honorable-steel-rasalhague)  
```console
node getChainConfig.js <chain>
```

run with comma separated chain-names (ex. honorable-steel-rasalhague,green-giddy-denebola )
```console
node getChainConfig.js <chain1>, <chain2>
```
run blank for all chains on set network (-s | staging, -m | mainnet )
```console
node getChainConfig.js 
```


Outputs with `--nodes` flag:
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

 Outputs without `--nodes` flag:
 ```
[
  {
    "schain": {
      "chain_name": "staging-legal-crazy-castor",
      "chain_id": "0x1c6199cc | 476158412",
      "proxy_endpoint": "https://staging-v3.skalenodes.com/v1/staging-legal-crazy-castor",
      "explorer": "https://staging-legal-crazy-castor.explorer.staging-v3.skalenodes.com"
    }
  }
]
```
