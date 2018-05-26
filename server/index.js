const app = require('./app')
const sockets = require('./sockets')
const Bot = require('../core/bot')
const { getOptions } = require('../core/cli')

// Server start and configuration
const port = process.env.PORT || 1337
const start = async () => {
  try {
    await app.listen(port)
    console.log(`App listening on port ${app.server.address().port}`)
  } catch (err) {
    throw err
  }
}
if (process.env.NODE_ENV !== 'production') {
  require('../webpack')(app)
}

// Initilization function
(async () => {
  await start()
  sockets(app.server)

  const opts = await getOptions()
  const bot = new Bot(opts)
})()
