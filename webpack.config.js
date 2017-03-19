let path = require('path')
let webpack = require('webpack')

module.exports = {
  entry: path.join(__dirname, 'modules/index.js'),
  output: {
    path: path.join(__dirname, 'umd'),
    filename: 'react-keeper.js',
    library: 'ReactKeeper',
    libraryTarget: 'umd'
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
}
