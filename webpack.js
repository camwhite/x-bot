const webpack = require('webpack')
const webpackDevMiddleWare = require('webpack-dev-middleware')
const webpackHotMiddleWare = require('webpack-hot-middleware')

const config = require('./webpack.config.js')

module.exports = (app) => {
  const compiler = webpack(config)
  app.use(webpackDevMiddleWare(compiler, {
    publicPath: config.output.publicPath,
    hot: true,
    filename: 'bundle.js',
    noInfo: true,
    historyApiFallback: true,
    stats: false
  }))
  app.use(webpackHotMiddleWare(compiler, {
    heartbeat: 10 * 1000,
    log: function () {}
  }))
}
