require('dotenv').config()
const axios = require('axios');
const beep = require('beepbeep');
const dialog = require('node-native-dialog');

if (!process.argv[3])
  throw new Error("You must supply a balance threshold. E.g 'yarn start 25'");

const BALANCE_THRESHOLD = process.argv[3];
const ALERT_MODE = process.argv[2];

if (ALERT_MODE === 'silent')
  console.info(`[${new Date().toLocaleString()}] Running in silent mode! SSSSHHHHHHH.`);

if (ALERT_MODE === 'both' || ALERT_MODE === 'dialog')
  console.info(`[${new Date().toLocaleString()}] Dialog alerts are enabled!`);

if (ALERT_MODE === 'both' || ALERT_MODE === 'beep') {
  console.info(`[${new Date().toLocaleString()}] Beeps enabled! Beep test, BEEP, BEEP!`);
  beep(2);
}

console.info(`[${new Date().toLocaleString()}] Waiting for balance to reach ${BALANCE_THRESHOLD}...`);

const getTokenBalance = async () => {

  const {data: {result}} = await axios.get(process.env.API_URI, {
    params: {
      module: 'account',
      action: 'tokenbalance',
      tag: 'latest',
      contractaddress: process.env.CONTRACT_ADDR,
      address: process.env.WALLET_ADDR,
      apikey: process.env.API_KEY
    }
  });

  const balance = result / process.env.TOKEN_DIVISOR;
  return balance;
}

const runAlerts = async (balance) => {

  if (ALERT_MODE === 'both' || ALERT_MODE === 'dialog')
    await dialog.show({
      msg: `Balance: ${balance.toFixed(2)}
  Go claim/compound!`,
      title: 'Address Balance',
      icon: dialog.INFO,
      buttons: dialog.OK,
      defaultButton: dialog.RIGHT,
    })

  if (ALERT_MODE === 'both' || ALERT_MODE === 'beep')
    beep(process.env.BEEP_COUNT);
}

let previousBalance = 0;
let canClaim = false;
const execute = async () => {

  try {
    const balance = await getTokenBalance();

    if (previousBalance === balance)
      return setTimeout(execute, process.env.REFRESH_MILLIS);

    if (balance >= BALANCE_THRESHOLD) {
      canClaim = true;
      console.info(`[${new Date().toLocaleString()}] Desired balance reached: ${balance.toFixed(2)}`);

      if (ALERT_MODE !== 'silent')
        await runAlerts(balance);

    } else if (canClaim) {
      console.warn(`[${new Date().toLocaleString()}] Balance is now depleted: ${balance.toFixed(2)}`);
      canClaim = false;
    } else
      console.info(`[${new Date().toLocaleString()}] Balance has updated: ${balance.toFixed(2)}`);

    previousBalance = balance;
  } catch (e) {
    console.error(`[${new Date().toLocaleString()}] Failed to retrieve token balance.`);
    console.error(e.message);
  }

  if (process.env.STOP_WHEN_REACHED) {
    console.error(`[${new Date().toLocaleString()}] Setting STOP_WHEN_REACHED is enabled, stopping script.`);
    process.exit(0);
  }

  return setTimeout(execute, process.env.REFRESH_MILLIS);
}

execute()
  .catch(err => console.error(err.message));
