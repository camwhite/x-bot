'use strict'

const sockets = require('socket.io')

module.exports = (server) => {
  const io = sockets(server, { transports: ['websocket', 'polling'] })
  global.io = io //expose the socket globally
}
