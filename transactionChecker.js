'use strict';

const notifier = require('node-notifier');
const {WALLET_ADDRESS} =  require('./config')

module.exports = ({ web3, web3http }) => {
    const account = WALLET_ADDRESS.toLowerCase();
    const subscription = web3.eth.subscribe('pendingTransactions', (err, res) => {
        if (err) console.error(err);
    });

    return function watchTransactions() {
            subscription.on('data', (txHash) => {
                setTimeout(async () => {
                    try {
                        let tx = await web3http.eth.getTransaction(txHash);
                        if (tx.to && tx.to !== null) {
                            if (tx.from.toLowerCase() === account) {
                                try {
                                    web3.eth.getBalance(WALLET_ADDRESS).then((result) => {
                                      const balance = web3.utils.fromWei(result);
                                      notifier.notify({
                                        title: "Ether amount Notification ",
                                        message: balance,
                                      });
                                    });
                                  } catch (error) {
                                    console.log(error);
                                  }
                            }
                        }
                    } catch (err) {
                        console.error(err);
                    }
                }, 60 * 1000);
            });
        }
}