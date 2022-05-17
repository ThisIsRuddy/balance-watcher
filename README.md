## Contract Token Address Balance Watcher

A script used for watching the balance of a contract token address. Alerts via beep & dialog prompt when desired
threshold is reached.

The script can be adjusted to watch other token address balances but currently the values are set to PlayMates (RND).

### Installation

1. `yarn install` or `npm install`

2. Copy `.env.SAMPLE` to `.env`

3. Update settings in `.env`

--- 

### Example Usage

`yarn start DESIRED_BALANCE`

e.g. `yarn start 25` or `npm start 25`

--- 

### Notification Modes

There are 4 modes with examples below utilizing a dialog prompt & beep sounds. The default mode is 'both'.

#### Both Alerts (Default)

e.g. `yarn start 25` or `npm start 25`

#### Dialog Alerts Only

e.g. `yarn dialog 25` or `npm run dialog 25`

#### Beep Alerts Only

e.g. `yarn beep 25` or `npm run beep 25`

#### Silent

e.g. `yarn silent 25` or `npm run silent 25`

---

### Environment Settings
`CONTRACT_ADDR` The token contract address for the token to watch. (Default: RND PlayMates)

`WALLET_ADDR` The wallet address to watch the balance of. (Default: RND PlayMates Reward Pool Wallet)

`TOKEN_DIVISOR` Tokens are set to different decimal places, this is used to calculate the balance based off the API response. 

`STOP_WHEN_REACHED` Whether or not to stop running once the desired balance is reached. (Default: 0)

`REFRESH_MILLIS` How long to wait between refreshes in milliseconds (1000 = 1sec), lower this too much, and you could end up getting rate limited. (Default: 2000)

`BEEP_COUNT` The amount of times to beep when the threshold balance is reached.
