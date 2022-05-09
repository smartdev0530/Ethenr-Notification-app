const Web3 = require("web3");
const cron = require("node-cron");
const notifier = require("node-notifier");
const BuildTransactionChecker = require("./transactionChecker");
const { WALLET_ADDRESS } = require("./config");
const { ALARM_TIME } = require("./config");
const { LIMIT_ETH_AMOUNT } = require("./config");
const CreateClient = require("./ethClient");
const { web3http, web3 } = CreateClient(Web3);
const watchTransactions = BuildTransactionChecker({ web3, web3http });

watchTransactions();

var task = cron.schedule(
  `0 ${ALARM_TIME} * * *`,
  async () => {
    try {
      web3.eth.getBalance(WALLET_ADDRESS).then((result) => {
        const balance = web3.utils.fromWei(result);

        if (parseFloat(balance) < LIMIT_ETH_AMOUNT) {
          notifier.notify({
            title: "Ether amount Notification ",
            message: ` Your ether amount is ${balance}.`,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  { scheduled: true }
);

task.start();
