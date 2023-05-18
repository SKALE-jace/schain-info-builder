# schain-info-builder

**Purpose**
-
collects chains.json from Proxy UI and transforms chain data into dev friendly format

**Method**
-
1) Uses argvs as filter values on the fethced json object from Proxy UI: [Staging](https://staging-v3.skalenodes.com) | [Mainnet](https://mainnet.skalenodes.com)
2) processes data into common dev format
3) writes prepared data to json in root folder
4) optionally maps returned node data to prepared sChain info


## Get the Data
### Go Composed: set your requested data via args
  * Set Network: mainnet `-m` or staging `-s`
  * Set Chains: defaults to All or explicitly list kebab-case `-c`
  * Include Node Endpoints: IP and ID `-n`

### Go Conigured: common options to call all, custom, and append node info

    mainnet:chains
    mainnet:chains:nodes
    staging:chains
    staging:chains:nodes
    mainnet:custom
    mainnet:custom:nodes
    staging:custom
    staging:custom:nodes


## SETUP 
1. run in your terminal 
```console
npm install
```
2. `echo "DONE"`


## Running 

### Compose Single
run with chain-name (ex. honorable-steel-rasalhague)  
```console
node getChainConfig.js -m -c <chain>
```
### Compose Multi
run with comma separated chain-names (ex. honorable-steel-rasalhague,green-giddy-denebola ) <-- NO SPACE betwenn comma,chain-name
```console
node getChainConfig.js -m -c <chain1>,<chain2> 
```
### Composed ALL
run blank for all chains on set network (-s | staging, -m | mainnet )
```console
node getChainConfig.js -m
```
### Configured
```console
npm run mainnet:custom honorable-steel-rasalhague,green-giddy-denebola
```

## OUTPUT DATA
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
```
 Outputs **without** `--nodes` flag:
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
