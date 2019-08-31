/**
 * package js files
 * auto run eslint task before build js files
 */

var fs = require('fs')
var path = require('path')
var webpack = require('webpack')

module.exports = {

  devtool: 'inline-source-map',

  entry: fs.readdirSync(__dirname).reduce(function (entries, dir) {
    if(['common', 'plugins', 'node_modules'].indexOf(dir) >= 0){
      return entries
    }
    if (fs.statSync(path.join(__dirname, dir)).isDirectory()){
      entries[dir] = path.join(__dirname, dir, 'App.js')
    }
    return entries
  }, {}),

  output: {
    path: __dirname + '/__build__',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  module: {
    preLoaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'eslint'}
    ],
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot', 'babel'] },
      { test: /\.css$/, loader: 'style!css' }
    ]
  },

  resolve: {
    alias: {
      // 'react-keeper': path.join(__dirname, '..', 'modules/index'),
      // 'react-actor': path.join(__dirname, '../..', 'react-actor/modules/Actor')
    }
  },

  // Expose __dirname to allow automatically setting basename.
  context: __dirname,
  node: {
    __dirname: true
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin('shared.js'),
    new webpack.HotModuleReplacementPlugin()
  ]
}
