// Modules
const fs = require('fs')
const path = require('path')

// Instantiate the app
const app = require('fastify')()

// Statically serve public path
const publicPath = path.join(__dirname, '../public')
app.register(require('fastify-static'), { root: publicPath })

// Middlewares
app.use(require('compression')())
app.use(require('serve-favicon')(path.join(publicPath, 'favicon.ico')))

// Routes
app.get('/', (request, reply) => {
  reply.sendFile('index.html')
})

module.exports = app
