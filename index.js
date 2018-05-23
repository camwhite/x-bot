const { getCredentials } = require('./utils/cli')
getCredentials().then(creds => console.log(creds))
