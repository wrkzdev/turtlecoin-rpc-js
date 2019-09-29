// Copyright (c) 2018-2019, Brandon Lehmann, The TurtleCoin Developers
//
// Please see the included LICENSE file for more information.

'use strict'

const TurtleCoind = require('./lib/turtlecoind-rpc')
const TurtleService = require('./lib/service-rpc')
const WalletAPI = require('./lib/walletapi-rpc')

module.exports = {
  TurtleCoind,
  TurtleService,
  WalletAPI,
  Walletd: TurtleService,
  Service: TurtleService,
  Client: TurtleCoind
}
