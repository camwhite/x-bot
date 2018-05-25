'use strict'

const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

let devtool

const entryPoints = [ path.join(__dirname, 'client', 'main.js') ]
const plugins = [
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    __PROD__: process.env.NODE_ENV === 'production'
  }),
]

if (process.env.NODE_ENV !== 'production') {
  entryPoints.push('webpack-hot-middleware/client')
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )

  devtool = 'eval'
} else {
  devtool = false
}

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    main: entryPoints
  },
  output: {
    path: path.resolve(__dirname, 'public', 'js'),
    publicPath: '/js',
    filename: '[name].bundle.js'
  },
  resolve: {
    modules: [ 'node_modules', path.resolve(__dirname, 'public', 'js') ],
    extensions: [ '.vue', '.js', '.json' ],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          { 
            loader: 'babel-loader',
            options: { presets: [[ 'env', { targets: { node: 'current' }}]] }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/, use: 'file-loader' },
      { test: /\.html$/, use: 'raw-loader' },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendor',
          chunks: 'all',
          reuseExistingChunk: true,
          priority: 1,
          enforce: true,
          test(module, chunks) {
            const name = module.nameForCondition && module.nameForCondition();
            return chunks.some(chunk => {
              return chunk.name === 'main' && /[\\/]node_modules[\\/]/.test(name);
            });
          }
        },
        secondary: {
          name: 'main',
          chunks: 'all',
          priority: 2,
          enforce: true,
          test(module, chunks) {
            return chunks.some(chunk => chunk.name === 'secondary');
          }
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: true,
          ecma: 6,
          mangle: true
        },
        sourceMap: false
      })
    ]
  },
  plugins: plugins
}
