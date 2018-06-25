'use strict'

const TurtleCoind = require('./turtlecoind-rpc.js')

var ClientRPC = function (opts) {
  opts = opts || {}
  if (!(this instanceof ClientRPC)) return new ClientRPC(opts)
  this.host = opts.host || '127.0.0.1'
  this.port = opts.port || 11898
  this.timeout = opts.timeout || 2000
  this.daemon = new TurtleCoind({
    host: this.host,
    port: this.port,
    timeout: this.timeout
  })
}

ClientRPC.prototype.getBlocks = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (!Array.isArray(opts.blockIds)) return reject(new Error('must supply an array of block IDs'))

    var body = {
      block_ids: opts.blockIds
    }

    this.daemon._rawPost('getblocks', body).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

ClientRPC.prototype.queryBlocks = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (!Array.isArray(opts.blockIds)) return reject(new Error('must supply an array of block IDs'))
    if (opts.timestamp === undefined) return reject(new Error('must supply a timestamp'))

    var body = {
      block_ids: opts.blockIds,
      timestamp: opts.timestamp
    }

    this.daemon._rawPost('queryblocks', body).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

ClientRPC.prototype.queryBlocksLite = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (!Array.isArray(opts.blockIds)) return reject(new Error('must supply an array of block IDs'))
    if (opts.timestamp === undefined) return reject(new Error('must supply a timestamp'))

    var body = {
      block_ids: opts.blockIds,
      timestamp: opts.timestamp
    }

    this.daemon._rawPost('queryblockslite', body).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

ClientRPC.prototype.getIndexes = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (opts.transactionHash === undefined) return reject(new Error('must supply a transaction hash'))

    var body = {
      txid: opts.transactionHash
    }

    this.daemon._rawPost('get_o_indexes', body).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

ClientRPC.prototype.getRandomOutputs = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (!Array.isArray(opts.amounts)) return reject(new Error('must supply an array of amounts'))
    if (opts.mixin === undefined) return reject(new Error('must supply a mixin value'))

    opts.mixin = parseInt(opts.mixin)
    if (isNaN(opts.mixin)) return reject(new Error('must supply a valid mixin value'))

    var body = {
      amounts: opts.amounts,
      outs_counts: opts.mixin
    }

    this.daemon._rawPost('getrandom_outs', body).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

ClientRPC.prototype.getPoolChanges = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (opts.tailBlockId === undefined) return reject(new Error('must supply a tail block ID'))
    if (!Array.isArray(opts.knownTransactionHashes)) return reject(new Error('must supply an array of known transaction hashes'))

    var body = {
      tailBlockId: opts.tailBlockId,
      knownTxsIds: opts.knownTransactionHashes
    }

    this.daemon._rawPost('get_pool_changes', body).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

ClientRPC.prototype.getPoolChangesLite = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (opts.tailBlockId === undefined) return reject(new Error('must supply a tail block ID'))
    if (!Array.isArray(opts.knownTransactionHashes)) return reject(new Error('must supply an array of known transaction hashes'))

    var body = {
      tailBlockId: opts.tailBlockId,
      knownTxsIds: opts.knownTransactionHashes
    }

    this.daemon._rawPost('get_pool_changes_lite', body).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

ClientRPC.prototype.getBlockDetailsByHeight = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (opts.height === undefined) return reject(new Error('must supply a block height'))

    opts.height = parseInt(opts.height)
    if (isNaN(opts.height)) return reject(new Error('must supply a valid block height'))

    var body = {
      blockHeight: opts.height
    }

    this.daemon._rawPost('get_block_details_by_height', body).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

ClientRPC.prototype.getBlocksDetailsByHeights = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (!Array.isArray(opts.heights)) return reject(new Error('must supply an array of block heights'))

    var body = {
      blockHeights: opts.heights
    }

    this.daemon._rawPost('get_blocks_details_by_heights', body).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

ClientRPC.prototype.getBlocksDetailsByHashes = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (!Array.isArray(opts.hashes)) return reject(new Error('must supply an array of block hashes'))

    var body = {
      blockHashes: opts.hashes
    }

    this.daemon._rawPost('get_blocks_details_by_hashes', body).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

ClientRPC.prototype.getBlocksHashesByTimestamps = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (opts.timestampBegin === undefined) return reject(new Error('must supply a beginning timestamp'))
    if (opts.seconds === undefined) return reject(new Error('must supply seconds value'))

    var body = {
      timestampBegin: opts.timestampBegin,
      secondsCount: opts.seconds
    }

    this.daemon._rawPost('get_blocks_hashes_by_timestamps', body).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

ClientRPC.prototype.getTransactionDetailsByHashes = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (!Array.isArray(opts.transactionHashes)) return reject(new Error('must supply an array of transaction hashes'))

    var body = {
      transactionHashes: opts.transactionHashes
    }

    this.daemon._rawPost('get_transaction_details_by_hashes', body).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

ClientRPC.prototype.getTransactionHashesByPaymentId = function (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    if (opts.paymentId === undefined) return reject(new Error('must supply a payment ID'))

    var body = {
      paymentId: opts.paymentId
    }

    this.daemon._rawPost('get_transaction_hashes_by_payment_id', body).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

module.exports = ClientRPC
