const { writeFileSync, readFileSync, existsSync } = require('fs')
const { terminal } = require('terminal-kit')
const { promisify } = require('util')

// Convert callbacks to promises
terminal.inputField = promisify(terminal.inputField)
terminal.yesOrNo = promisify(terminal.yesOrNo)

// The config object
const twitch = {
  options: {
    debug: false
  },
  connection: {
    reconnect: true,
  },
  identity: {}
}

const getCredentials = async () => {
  terminal.on('key', (key) => {
    if ( key === 'CTRL_C' ) {
      terminal.green( 'CTRL-C detected...\n' ) ;
      process.exit()
    }
  }) 
  // Check if the credentials already exist
  // and give option not to use
  if (existsSync('./credentials.json')) {
    terminal('Would to use the save credentials? [Y|n]\n')
    const result = await terminal.yesOrNo({ yes: [ 'y', 'ENTER' ], no: [ 'n' ] })
    if (result) {
      const twitch = readFileSync('./credentials.json')
      return JSON.parse(twitch)
    }
  }

  // Twitch prompts
  terminal('Twitch username: ')
  const username = await terminal.inputField()
  twitch.identity.username = username

  terminal('\nTwitch oauth password: ')
  const password = await terminal.inputField()
  twitch.identity.password = password

  terminal('\nTwitch channel to join: ')
  const channel = await terminal.inputField()
  twitch.channels = [ `#${channel}` ] 

  // Save prompt
  terminal('\nWould you like to save this info for next time? [Y|n]\n')
  const result = await terminal.yesOrNo({ yes: [ 'y', 'ENTER' ], no: [ 'n' ] })
  if (result) {
    writeFileSync('./credentials.json', JSON.stringify(twitch))
  } else {
    terminal.red('You will need to login again next time :/')
  }

  return twitch
}

module.exports = { getCredentials }
