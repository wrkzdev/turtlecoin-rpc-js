// Copyright (c) 2018, Brandon Lehmann, The TurtleCoin Developers
//
// Please see the included LICENSE file for more information.

'use strict'

const request = require('request-promise-native')
const util = require('util')

var TurtleCoindRPC = function (opts) {
  opts = opts || {}
  if (!(this instanceof TurtleCoindRPC)) return new TurtleCoindRPC(opts)
  this.host = opts.host || '127.0.0.1'
  this.port = opts.port || 11898
  this.timeout = opts.timeout || 2000
  this.ssl = opts.ssl || false
}

TurtleCoindRPC.prototype.getBlocks = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (!opts.height) return reject(new Error('must specify height'))

    this._post('f_blocks_list_json', {
      height: opts.height
    }).then((result) => {
      return resolve(result.blocks)
    }).catch((err) => {
      return reject(err)
    })
  })
}

TurtleCoindRPC.prototype.getBlock = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (!opts.hash) return reject(new Error('must specify hash'))

    this._post('f_block_json', {
      hash: opts.hash
    }).then((result) => {
      return resolve(result.block)
    }).catch((err) => {
      return reject(err)
    })
  })
}

TurtleCoindRPC.prototype.getTransaction = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (!opts.hash) return reject(new Error('must specify hash'))

    this._post('f_transaction_json', {
      hash: opts.hash
    }).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

TurtleCoindRPC.prototype.getTransactionPool = function () {
  return new Promise((resolve, reject) => {
    this._post('f_on_transactions_pool_json').then((result) => {
      return resolve(result.transactions)
    }).catch((err) => {
      return reject(err)
    })
  })
}

TurtleCoindRPC.prototype.getBlockCount = function () {
  return new Promise((resolve, reject) => {
    this._post('getblockcount').then((result) => {
      return resolve(result.count)
    }).catch((err) => {
      return reject(err)
    })
  })
}

TurtleCoindRPC.prototype.getBlockHash = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (!opts.height) return reject(new Error('must specify height'))

    this._post('on_getblockhash', [
      opts.height
    ]).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

TurtleCoindRPC.prototype.getBlockTemplate = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (!opts.reserveSize) return reject(new Error('must specify reserveSize'))
    if (!opts.walletAddress) return reject(new Error('must specify walletAddress'))

    this._post('getblocktemplate', {
      reserve_size: opts.reserveSize,
      wallet_address: opts.walletAddress
    }).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

TurtleCoindRPC.prototype.submitBlock = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (!opts.blockBlob) return reject(new Error('must specify blockBlob'))
    this._post('submitblock', [
      opts.blockBlob
    ]).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

TurtleCoindRPC.prototype.getLastBlockHeader = function () {
  return new Promise((resolve, reject) => {
    this._post('getlastblockheader').then((result) => {
      return resolve(result.block_header)
    }).catch((err) => {
      return reject(err)
    })
  })
}

TurtleCoindRPC.prototype.getBlockHeaderByHash = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (!opts.hash) return reject(new Error('must specify hash'))

    this._post('getblockheaderbyhash', {
      hash: opts.hash
    }).then((result) => {
      return resolve(result.block_header)
    }).catch((err) => {
      return reject(err)
    })
  })
}

TurtleCoindRPC.prototype.getBlockHeaderByHeight = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (!opts.height) return reject(new Error('must specify height'))

    this._post('getblockheaderbyheight', {
      height: opts.height
    }).then((result) => {
      return resolve(result.block_header)
    }).catch((err) => {
      return reject(err)
    })
  })
}

TurtleCoindRPC.prototype.getCurrencyId = function () {
  return new Promise((resolve, reject) => {
    this._post('getcurrencyid').then((result) => {
      return resolve(result.currency_id_blob)
    }).catch((err) => {
      return reject(err)
    })
  })
}

TurtleCoindRPC.prototype.getHeight = function () {
  return this.height()
}

TurtleCoindRPC.prototype.height = function () {
  return new Promise((resolve, reject) => {
    this._get('height').then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

TurtleCoindRPC.prototype.getInfo = function () {
  return this.info()
}

TurtleCoindRPC.prototype.info = function () {
  return new Promise((resolve, reject) => {
    this._get('info').then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

TurtleCoindRPC.prototype.feeInfo = function () {
  return this.fee()
}

TurtleCoindRPC.prototype.fee = function () {
  return new Promise((resolve, reject) => {
    this._get('fee').then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

TurtleCoindRPC.prototype.getTransactions = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (!opts.hashes) return reject(new Error('must specify transaction hashes'))

    this._rawPost('gettransactions', {
      txs_hashes: opts.hashes
    }).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

TurtleCoindRPC.prototype.getPeers = function () {
  return this.peers()
}

TurtleCoindRPC.prototype.peers = function () {
  return new Promise((resolve, reject) => {
    this._get('peers').then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

TurtleCoindRPC.prototype.sendRawTransaction = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (!opts.tx) return reject(new Error('must specify raw serialized transaction'))

    this._rawPost('sendrawtransaction', {
      tx_as_hex: opts.tx
    }).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

TurtleCoindRPC.prototype.getWalletSyncData = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}

    if (!opts.startHeight) {
      opts.startHeight = 0
    }

    if (!opts.startTimestamp) {
      opts.startTimestamp = 0
    }

    if (!opts.blockHashCheckpoints) {
      opts.blockHashCheckpoints = {}
    }

    this._rawPost('getwalletsyncdata', {
      startHeight: opts.startHeight,
      startTimestamp: opts.startTimestamp,
      blockHashCheckpoints: opts.blockHashCheckpoints
    }).then((result) => {
      if (!result.status || !result.items) {
        return reject(new Error('Missing items or status key'))
      }
      if (result.status !== 'OK') {
        return reject(new Error('Status not OK'))
      }
      return resolve(result.items)
    }).catch((err) => {
      return reject(err)
    })
  })
}

TurtleCoindRPC.prototype.getGlobalIndexesForRange = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}

    if (!opts.startHeight) return reject(new Error('Must specify start height'))
    if (!opts.endHeight) return reject(new Error('Must specify end height'))

    this._rawPost('get_global_indexes_for_range', {
      startHeight: opts.startHeight,
      endHeight: opts.endHeight
    }).then((result) => {
      if (!result.status || !result.indexes) {
        return reject(new Error('Missing indexes or status key'))
      }
      if (result.status !== 'OK') {
        return reject(new Error('Status not OK'))
      }
      return resolve(result.indexes)
    }).catch((err) => {
      return reject(err)
    })
  })
}

TurtleCoindRPC.prototype.getTransactionsStatus = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}

    if (!opts.transactionHashes) return reject(new Error('Must specify transaction hashes'))

    this._rawPost('get_transactions_status', {
      transactionHashes: opts.transactionHashes
    }).then((result) => {
      if (!result.status || !result.transactionsInPool || !result.transactionsInBlock || !result.transactionsUnknown) {
        return reject(new Error('Missing status or transactions key'))
      }
      if (result.status !== 'OK') {
        return reject(new Error('Status not OK'))
      }
      return resolve({
        transactionsInPool: result.transactionsInPool,
        transactionsInBlock: result.transactionsInBlock,
        transactionsUnknown: result.transactionsUnknown
      })
    }).catch((err) => {
      return reject(err)
    })
  })
}

TurtleCoindRPC.prototype._get = function (method) {
  return new Promise((resolve, reject) => {
    if (method.length === 0) return reject(new Error('no method supplied'))
    var protocol = (this.ssl) ? 'https' : 'http'

    request({
      uri: util.format('%s://%s:%s/%s', protocol, this.host, this.port, method),
      method: 'GET',
      json: true,
      timeout: this.timeout
    }).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

TurtleCoindRPC.prototype._post = function (method, params) {
  return new Promise((resolve, reject) => {
    if (method.length === 0) return reject(new Error('no method supplied'))
    params = params || {}

    var body = {
      jsonrpc: '2.0',
      method: method,
      params: params
    }

    this._rawPost('json_rpc', body).then((result) => {
      if (!result.error) {
        return resolve(result.result)
      } else {
        return reject(result.error.message)
      }
    }).catch((err) => {
      return reject(err)
    })
  })
}

TurtleCoindRPC.prototype._rawPost = function (endpoint, body) {
  return new Promise((resolve, reject) => {
    if (endpoint.length === 0) return reject(new Error('no endpoint supplied'))
    if (body === undefined) return reject(new Error('no body supplied'))
    var protocol = (this.ssl) ? 'https' : 'http'

    request({
      uri: util.format('%s://%s:%s/%s', protocol, this.host, this.port, endpoint),
      method: 'POST',
      body: body,
      json: true,
      timeout: this.timeout
    }).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

module.exports = TurtleCoindRPC
