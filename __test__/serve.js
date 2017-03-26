let express = require('express')
let path = require('path')

let app = express()

app.use(express.static(__dirname))

app.use(express.static(__dirname + '/../umd'))

app.listen(8601, 'localhost', function(error) {
  if(error) {
    console.log('Error:', error)
  } else {
    console.log('Server listen on http://localhost:8601.')
  }
})
