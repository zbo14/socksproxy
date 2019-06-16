'use strict'

const net = require('net')

const BUFFER_SIZE = 8

class SOCKSClient {
  constructor () {
    this.buf = Buffer.alloc(BUFFER_SIZE)
    this.idx = 0
    this.sock = null
  }

  async connect (port, host, socksPort = process.env.SOCKS_PORT) {
    const handler = this.handleData.bind(this)

    await new Promise((resolve, reject) => {
      this.sock = net.connect(socksPort, '0.0.0.0', resolve)
      this.sock.on('data', handler)
      this.sock.once('error', reject)
    })

    const [ result ] = await Promise.all([
      this.readResponse(),
      this.writeRequest(port, host)
    ])

    this.sock.removeListener('data', handler)

    return result
  }

  handleData (chunk) {
    if (this.idx + chunk.byteLength > BUFFER_SIZE) {
      return this.sock.destroy(new Error('Buffer overflow'))
    }

    chunk.copy(this.buf, this.idx)
    this.idx += chunk.byteLength
    this.sock.emit('buffer')
  }

  pipe (sock) {
    sock.pipe(this.sock).pipe(sock)
  }

  async readResponse () {
    while (this.idx < BUFFER_SIZE) {
      await this.wait()
    }

    if (this.buf[0]) {
      throw new Error('Expected null byte, got ' + this.buf[0])
    }

    if (this.buf[1] !== 0x5a) {
      throw new Error('Request rejected or failed')
    }

    const port = this.buf.slice(2, 4).readUInt16BE()
    const host = this.buf.slice(4).join('.')

    return { host, port }
  }

  writeRequest (port, host) {
    const buf = Buffer.alloc(2)
    buf.writeUInt16BE(port)

    const addr = host.split('.').map(Number)
    const arr = [ 0x4, 0x1, ...buf ]

    if (addr.length !== 4 || addr.includes(NaN)) {
      arr.push(0, 0, 0, 1, 0x0, ...Buffer.from(host), 0x0)
    } else {
      arr.push(...addr, 0x0)
    }

    const data = Buffer.from(arr)

    return this.write(data)
  }

  wait (ms = 60e3) {
    const timeout = setTimeout(() => {
      this.sock.destroy(new Error('Timeout'))
    }, ms)

    return new Promise((resolve, reject) => {
      this.sock.once('error', err => {
        clearTimeout(timeout)
        reject(err)
      })

      this.sock.once('buffer', () => {
        clearTimeout(timeout)
        resolve()
      })
    })
  }

  write (data) {
    return new Promise((resolve, reject) => {
      this.sock.once('error', reject)
      this.sock.write(data, resolve)
    })
  }
}

module.exports = SOCKSClient
