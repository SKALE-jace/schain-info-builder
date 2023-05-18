const fs = require('fs');
const axios = require('axios');
const Web3 = require('web3-utils');
const commander = require('commander');


function commaSeparatedList(value, previous) {
  return value.split(',');
}
commander
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]...')
  .option('-s, --staging', 'Sets network to SKALE Staging')
  .option('-m, --mainnet', 'Sets network to SKALE Mainnet')
  .option('-n, --nodes', 'adds Node info/endpoints')
  .option('-c, --chains <items>', 'Set chains to generate data for', commaSeparatedList)
  .parse(process.argv);

const options = commander.opts();


function setNetwork() { 
if ( options.staging ) {
  console.log('Network: ⵎSKALE Staging');
  return ['https://staging-v3.skalenodes.com/files/chains.json', 'https://staging-v3.skalenodes.com/v1/','.explorer.staging-v3.skalenodes.com' ];
} else if ( options.mainnet ) {
  console.log('Network: ⵎSKALE Mainnet');
  return ['https://mainnet.skalenodes.com/files/chains.json','https://mainnet.skalenodes.com/v1/', '.explorer.mainnet.skalenodes.com'];
}    
}

function setChains() {

  if ( options.chains ) {
    console.log('Chains: ', options.chains);
    return options.chains;
  } else  {
    return 'ALL';
  }
}

const chainsJSON = setNetwork();
const chains = setChains();



/* TODO:
1)add first letter lookup (hsr,ggd)
2)Sort chains Alpabetical 
*/


// get chains.json from proxy-ui
axios.get(chainsJSON[0])
  .then((response) => {

    let jsonArray = response.data;
    let filteredJSON;
    
    if ( chains != 'ALL') {
       filteredJSON = jsonArray.filter((obj) => {
      return chains.includes(obj.schain[0]);
      }); } else { filteredJSON = jsonArray }

  
    

    // schain data transformer
    const getChainInfo = (schainName) => {
      const hash = Web3.keccak256(schainName).slice(7, 15);
      const chainProxy = `${chainsJSON[1]}${schainName}`;
      const chainExplorer = `https://${schainName}${chainsJSON[2]}`;
    
      return {
        chain_name: schainName,
        proxy_endpoint: chainProxy,
        chain_id: `0x${hash} | ${parseInt(hash, 16)}`,
        explorer: chainExplorer,
      };
    };



    // create output .json of schain info and node array (if --nodes is set )
    
    const outputArray = filteredJSON.map((obj) => {
      const schain = obj.schain[0];
      if (options.nodes) {
      const nodes = obj.nodes.map(({ id, name, http_endpoint_ip, https_endpoint_ip }) => ({ id, name, http_endpoint_ip, https_endpoint_ip }));
      return { schain: getChainInfo(schain), nodes };
      } else { 
        return { schain: getChainInfo(schain) } 
      };
    });


    // output transformed data to SKALEchainInfo.json
    fs.writeFile('SKALEchainInfo.json', JSON.stringify(outputArray, null, 2), (err) => {
      if (err) throw err;
      console.log('Data written to ./SKALEchainInfo.json');
    });
  })
  .catch((error) => {
    console.error(error);
  });
