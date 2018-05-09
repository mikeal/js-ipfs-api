'use strict'

const promisify = require('promisify-es6')
const Big = require('big.js')

const transform = function (res, callback) {
  callback(null, {
    Peer: res.Peer,
    Value: new Big(res.Value),
    Sent: new Big(res.Sent),
    Recv: new Big(res.Recv),
    Exchanged: new Big(res.Exchanged)
  })
}

module.exports = (send) => {
  return promisify((peerId, opts, callback) => {
    if (typeof (opts) === 'function') {
      callback = opts
      opts = {}
    }

    send.andTransform({
      path: 'bitswap/ledger',
      args: peerId,
      qs: opts
    }, transform, callback)
  })
}
