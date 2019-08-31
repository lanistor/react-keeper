var WebpackDevServer = require("webpack-dev-server")
var webpack = require('webpack')
var path = require('path')
var config = require('./webpack.config')

var publicPath = '/__build__'

var port = 8600

for(var key in config.entry){
  if(!(config.entry[key] instanceof Array)) {
    config.entry[key] = [ config.entry[key] ]
  }
  config.entry[key].unshift(
    'webpack-dev-server/client?http://localhost:8600',
    'webpack/hot/only-dev-server'
  )
}
config.output.publicPath = publicPath

var server = new WebpackDevServer(webpack(config), {
  contentBase: [__dirname],
	publicPath: publicPath,
	hot: true,
	inline: true,
	stats: {
		colors: true
	},
	noInfo: false,
	quiet: false,
  historyApiFallback: {
    rewrites: [
      { from: /^\/([^\/]+)(\/)?$/, to: ( { match } )=>{
          return path.join(match[1], 'index.html')
        }
      }
    ]
  }
})

process.on('uncaughtException', function (err) {
  console.error('--uncaughtException--', err);
});

server.listen(port, 'localhost', function (error, result) {
  if(error) {
    console.error(error)
  }else {
    console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
  }
})
