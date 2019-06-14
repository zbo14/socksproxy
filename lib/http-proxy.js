'use strict'

const http = require('http')
const SOCKSClient = require('./socks-client')

class Server extends http.Server {
  constructor () {
    super()

    this.on('connect', this.handleConnect.bind(this))
  }

  async handleConnect (req, sock, head) {
    try {
      const client = new SOCKSClient()
      const [ host, port ] = req.url.split(':')

      await client.connect(+port, host)

      const promise = new Promise((resolve, reject) => {
        sock.once('error', reject)
        sock.write('HTTP/1.1 200 Connection Established\r\n\r\n', resolve)
      })

      await Promise.all([ promise, client.write(head) ])

      client.pipe(sock)
    } catch (err) {
      sock.write('HTTP/1.1 500 Internal Server Error\r\n\r\n')
      console.error(err)
    }
  }

  start (port = process.env.HTTP_PORT) {
    return new Promise((resolve, reject) => {
      this.once('error', reject)
      this.listen(port, '0.0.0.0', resolve)
    })
  }

  stop () {
    return new Promise((resolve, reject) => {
      this.close(err => err ? reject(err) : resolve())
    })
  }
}

module.exports = Server
