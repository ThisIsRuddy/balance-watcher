## Contract Token Address Balance Watcher
A script used for watching the balance of a contract token address. Alerts via beep & dialog prompt when desired threshold is reached.

`yarn install`
Add snowtrace.io API_KEY to `index.js`

--- 
### Alert when desired balance reached
`yarn start DESIRED_BALANCE`

e.g.
`yarn start 25`

### Silent mode
`yarn start DESIRED_BALANCE false`

e.g.
`yarn start 25 false`
