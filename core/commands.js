const say = require('say')
const search = require('youtube-search')
const { promisify } = require('util')
const searchYoutubeAsync = promisify(search)
const ytKey = 'AIzaSyD061YmlmYOUjvf1uAe3KCqaTIW4IzupHc'

class Commands {

  static testForCommand (message) {
    const [ char ] = message.split('')
    if (/[A-Z]/.test(char)) {
      return this.rickroll()
    }
    const [ command, ...args ] = message.split(' ')
    const arg = args.join(' ')

    switch (command) {
      case '!yt' :
        return this.youtube(arg)
      case '!next' :
        return this.next()
      case '!say' :
        return this.say(arg)
      case '!tag' :
        return this.tag(arg)
    }
  }

  static async youtube (arg) {
    const opts = {
      maxResults: 1,
      key: ytKey,
      type: 'video'
    }
    const [ result ] = await searchYoutubeAsync(arg, opts)
    global.io.emit('youtube', result)
  }


  static async next () {
    global.io.emit('next')
  }

  static async tag (arg) {
    global.io.emit('tag', arg)
  }

  static async say (arg) {
    say.speak(arg)
  }

  static async rickroll () {
    global.io.emit('roll')
  }

}

module.exports = Commands
