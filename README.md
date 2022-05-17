## Contract Token Address Balance Watcher

A script used for watching the balance of a contract token address. Alerts via beep & dialog prompt when desired
threshold is reached.

The script can be adjusted to watch other token address balances but currently the values are set to PlayMates (RND).

### Installation

`yarn install` or `npm install`
Add snowtrace.io API_KEY to `index.js`

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

e.g. `yarn start 25 dialog` or `npm start 25 dialog`

#### Beep Alerts Only

e.g. `yarn start 25 beep` or `npm start 25 beep`

#### Silent

e.g. `yarn start 25 silent`
