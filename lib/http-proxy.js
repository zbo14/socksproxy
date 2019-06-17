'use strict'

const http = require('http')
const SOCKSClient = require('./socks-client')

/**
 * An HTTP proxy that routes traffic through a SOCKS4(a) proxy.
 *
 * @extends http.Server
 */
class HTTPProxy extends http.Server {
  constructor () {
    super()

    this.on('connect', this.handleConnect.bind(this))
  }

  async handleConnect (req, sock, head) {
    try {
      const client = new SOCKSClient()
      const [ host, port ] = req.url.split(':')

      await client.connect(+port, host, this.socksPort)

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

  /**
   * Start the HTTP proxy.
   *
   * @param  {Object} [opts = {}]
   * @param  {Number} [opts.httpPort  = process.env.HTTP_PORT]  - the port the HTTP proxy should listen on
   * @param  {Number} [opts.socksPort = process.env.SOCKS_PORT] - the port the SOCKS proxy is listening on
   *
   * @return {Promise}
   */
  start ({ httpPort = process.env.HTTP_PORT, socksPort = process.env.SOCKS_PORT } = {}) {
    this.socksPort = +socksPort

    return new Promise((resolve, reject) => {
      this.once('error', reject)
      this.listen(httpPort, '0.0.0.0', resolve)
    })
  }

  /**
   * Stop the HTTP proxy.
   *
   * @return {Promise}
   */
  stop () {
    return new Promise((resolve, reject) => {
      this.close(err => err ? reject(err) : resolve())
    })
  }
}

module.exports = HTTPProxy
