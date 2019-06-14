'use strict'

const HTTPProxy = require('./lib/http-proxy')

const httpProxy = new HTTPProxy()

httpProxy.on('error', err => {
  console.error(err)
  process.exit(1)
})

httpProxy.start()
  .then(() => console.log('HTTP Proxy started!'))
