const fs = require('fs');
const axios = require('axios');
const Web3 = require('web3');

// Get the command line arguments as an array
const searchValues = process.argv.slice(2);

//mainnet
const proxy = 'https://mainnet.skalenodes.com/files/chains.json';

//staging
// const proxy = "https://staging-v3.skalenodes.com/files/chains.json";


// get chains.json from proxy-ui
axios.get(proxy)
  .then((response) => {
    const jsonArray = response.data;

    // schain Data with searchValues
    const filteredArray = jsonArray.filter((obj) => {
      const schain = obj.schain[0];
      return searchValues.includes(schain);
    });

    // schain info transformer
    const getChainInfo = (schainName) => {
      const hash = Web3.utils.keccak256(schainName).slice(7, 15);
      const explorer = `https://${schainName}.explorer.mainnet.skalenodes.com`;
      return {
        chain_name: schainName,
        chain_id: `0x${hash} | ${parseInt(hash, 16)}`,
        explorer: explorer,
      };
    };

    // create output .json of schain info and node array
    const outputArray = filteredArray.map((obj) => {
      const schain = obj.schain[0];
      const nodes = obj.nodes.map(({ id, name, http_endpoint_ip, https_endpoint_ip }) => ({ id, name, http_endpoint_ip, https_endpoint_ip }));
      return { schain: getChainInfo(schain), nodes };
    });

    // output transformed datat to mainnet-nodeEndpoints.json
    fs.writeFile('mainnet-nodeEndpoints.json', JSON.stringify(outputArray, null, 2), (err) => {
      if (err) throw err;
      console.log('sChain data written to: mainnet-nodeEndpoints.json');
    });
  })
  .catch((error) => {
    console.error(error);
  });
