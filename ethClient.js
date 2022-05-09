"use strict";

const { API_ADDRESS } = require('./config');
module.exports = (Web3) => ({
  web3http: new Web3(
    new Web3.providers.HttpProvider(
      `https://ropsten.infura.io/v3/${API_ADDRESS}`
    )
  ),
  web3: new Web3(
    new Web3.providers.WebsocketProvider(
      `wss://ropsten.infura.io/ws/v3/${API_ADDRESS}`
    )
  ),
});
