const tmi = require('tmi.js')
const chalk = require('chalk')
const { renderMessages } = require('./cli')
const Commands = require('./commands')

class Bot {

  constructor (opts) {
    this.opts = opts

    this.client = new tmi.client(opts)
    this.client.connect()

    this.client.on('message', this.onMessage)
    this.client.on('join', this.onJoin)
    this.client.on('part', this.onPart)
  }

  /**
   * Sends a message to twitch irc from discord.
   * @param {object} the message data
   * @return {promise} the sent message
   */
  async sendToTwitch (message) {
    let sent
    try {
      sent = await twitchClient.say(this.opts.identity.username, message)
    } catch (err) {
      throw new Error(err)
    }

    return sent
  }

  /**
   * On message handler logs messages.
   * @param {array} the incoming channel
   * @param {object} the user state
   * @param {string} the message text
   * @param {boolean} is the message from me
   */
  async onMessage (channel, userstate, message, self) {
    const username = userstate['display-name']
    //if (username === this.opts.identity.username) return

    const data = { username, text: message }
    if (channel[0] !== 'WHISPER') {
      renderMessages('MESSAGE', data)
      global.io.emit('msg', data)
    }
    await Commands.testForCommand(message)
  }

  /**
   * On join handler emits join events.
   * @param {array} the incoming channel
   * @param {string} the username
   * @param {boolean} is the message from me
   */
  async onJoin (channel, username, self) {
    if (self) return
    renderMessages('JOIN', { username, text: 'has joined' })
    global.io.emit('join', { username })
  }

  /**
   * On part handler emits part events.
   * @param {array} the incoming channel
   * @param {string} the username
   * @param {boolean} is the message from me
   */
  async onPart (channel, username, self) {
    if (self) return
    renderMessages('LEAVE', { username, text: 'has left' })
    global.io.emit('join', { username })
  }
}

module.exports = Bot
