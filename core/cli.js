const { writeFileSync, readFileSync, existsSync } = require('fs')
const { terminal } = require('terminal-kit')
const clui = require('clui')
const clc = require('cli-color')
const { Line, LineBuffer } = clui

// Convert callbacks to promises with nodes built-in adapter
const { promisify } = require('util')
terminal.inputField = promisify(terminal.inputField)
terminal.yesOrNo = promisify(terminal.yesOrNo)

// The options object
const twitch = {
  options: {
    debug: true
  },
  connection: {
    reconnect: true,
  },
  identity: {}
}

const getOptions = async () => {
  terminal.on('key', (key) => {
    if (key === 'CTRL_C') {
      terminal.red('CTRL-C detected...\n') ;
      process.exit()
    }
  }) 
  // Check if the credentials already exist
  // and give option not to use
  if (existsSync('./credentials.json')) {
    terminal('Would to use the saved options? [Y|n]\n')
    const result = await terminal.yesOrNo({ yes: [ 'y', 'ENTER' ], no: [ 'n' ] })
    if (result) {
      const twitch = readFileSync('./credentials.json')
      terminal.reset()
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
  terminal.reset()

  return twitch
}

const outputBuffer = new LineBuffer({
  x: 0,
  y: 0,
  width: 'console',
  height: 'console'
})

const renderMessages = async (title, message) => {
  const header = new Line()
    .column(title, 'console', [clc.green])
    .fill()
  const username = new Line()
    .column(message.username, 'console', [clc.cyan])
    .fill()
  const text = new Line()
    .column(message.text, 'console', [clc.white])
    .fill()

  outputBuffer.addLine(header)
  outputBuffer.addLine(username)
  outputBuffer.addLine(text)

  return outputBuffer.output()
}

module.exports = { getOptions, renderMessages }
