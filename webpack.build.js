let path = require('path')
let webpack = require('webpack')

module.exports = {
  entry: path.join(__dirname, 'modules/index.js'),
  output: {
    library: 'ReactKeeper',
    libraryTarget: 'umd'
  },
  externals: {
    react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
    'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
  },

  resolve: {
    alias: {
      // 'vhistory': path.join(__dirname, '..', 'history/modules'),
      // 'react-actor': path.join(__dirname, '..', 'react-actor/modules/index')
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
