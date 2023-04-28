# schain-info-builder
collect chains.json and transform the data

searches and filters the data for the chains you add 
(blank == all)

run the command with chain names ex. honorable-steel-rasalhague
`node mainnetEndpoints.js <chain1> <chain2>` 

Outputs:
 
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
      
      }
 ]
