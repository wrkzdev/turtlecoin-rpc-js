# TurtleCoin RPC API

This project is designed to make it very easy to interact with various RPC APIs available within the [TurtleCoin](https://turtlecoin.lol) Project. This entire project uses [Javascript Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) to make things fast, easy, and safe.

## Table of Contents

1. [Installation](#installation)
2. [Intialization](#intialization)
3. [TurtleCoind RPC API Interface](#turtlecoind-rpc-api-interface)
4. [Walletd RPC API Interface](#walletd-rpc-api-interface)

## Installation

```bash
npm install turtlecoin-rpc
```

## Intialization

### TurtleCoind
```javascript
const TurtleCoind = require('turtlecoin-rpc').TurtleCoind

const daemon = new TurtleCoind({
  host: '127.0.0.1', // ip address or hostname of the TurtleCoind host
  port: 11898, // what port is the RPC server running on
  timeout: 2000 // requrest timeout
})
```

### walletd

```javascript
const Walletd = require('turtlecoin-rpc').Walletd

const wallet = new Walletd({
  host: '127.0.0.1', // ip address or hostname of the walletd host
  port: 11898, // what port is walletd running on
  timeout: 2000, // request timeout
  rpcPassword: 'changeme', // must be set to the password used to run walletd
  
  // RPC API default values
  defaultMixin: 6, // the default mixin to use for transactions
  defaultFee: 0.1, // the default transaction fee for transactions
  defaultBlockCount: 1, // the default number of blocks when blockCount is required
  decimalDivisor: 100, // Currency has many decimal places?
  defaultFirstBlockIndex: 1, // the default first block index we will use when it is required
  defaultUnlockTime: 0, // the default unlockTime for transactions
  defaultFusionThreshold: 10000000, // the default fusionThreshold for fusion transactions
})
```

## TurtleCoind RPC API Interface

We expose all of the TurtleCoind RPC API commands via the ```TurtleCoind``` interface. Each of the below methods are [Javascript Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises). For safety sake, **always** handle your promise catches as we do use them properly.

Methods noted having options have parameters that may be *optional* or *required* as documented.

### daemon.getBlocks(options)

Returns information on the last 30 blocks before *height* (inclusive).

```options.height``` The height of the blockchain to start at - *required*

#### Example Data

```javascript
[
  {
    "cumul_size": 22041,
    "difficulty": 285124963,
    "hash": "62f0058453292af5e1aa070f8526f7642ab6974c6af2c17088c21b31679c813d",
    "height": 500000,
    "timestamp": 1527834137,
    "tx_count": 4
  },
  {
    "cumul_size": 384,
    "difficulty": 258237161,
    "hash": "74a45602da61b8b8ff565b1c81c854416046a23ca53f4416684ffaa60bc50796",
    "height": 499999,
    "timestamp": 1527834031,
    "tx_count": 1
  },
  {
    "cumul_size": 418,
    "difficulty": 256087255,
    "hash": "ed628ff13eacd5b99c5d7bcb3aeb29ef8fc61dbb21d48b65e0cdaf5ab21211c1",
    "height": 499998,
    "timestamp": 1527834020,
    "tx_count": 1
  }
]
```

### daemon.getBlock(options)

Returns information on a single block

```options.hash``` Block hash of the block you wish to retrieve - *required*

#### Sample Data

```javascript
{
  "alreadyGeneratedCoins": "1484230931125",
  "alreadyGeneratedTransactions": 974921,
  "baseReward": 2935998,
  "blockSize": 48846,
  "depth": 0,
  "difficulty": 358164537,
  "effectiveSizeMedian": 100000,
  "hash": "f11580d74134ac34673c74f8da458080aacbe1eccea05b197e9d10bde05139f5",
  "height": 501854,
  "major_version": 4,
  "minor_version": 0,
  "nonce": 214748383,
  "orphan_status": false,
  "penalty": 0,
  "prev_hash": "674046ea53a8673c630bd34655c4723199e69fdcfd518503f4c714e16a7121b5",
  "reward": 2936608,
  "sizeMedian": 231,
  "timestamp": 1527891820,
  "totalFeeAmount": 610,
  "transactions": [
    {
      "amount_out": 2936608,
      "fee": 0,
      "hash": "61b29d7a3fe931928388f14cffb5e705a68db219e1df6b4e15aee39d1c2a16e8",
      "size": 266
    },
    {
      "amount_out": 2005890,
      "fee": 110,
      "hash": "8096a55ccd0d4a736b3176836429905f349c3de53dd4e92d34f4a2db7613dc4b",
      "size": 2288
    },
    {
      "amount_out": 3999900,
      "fee": 100,
      "hash": "304a068cbe87cd02b48f80f8831197174b133870d0c118d1fe65d07a33331c4e",
      "size": 2691
    },
    {
      "amount_out": 7862058,
      "fee": 100,
      "hash": "29c0d6708e8148eec6e02173b3bab0093768e5f486f553939495a47f883b4445",
      "size": 9638
    },
    {
      "amount_out": 6951392,
      "fee": 100,
      "hash": "fe661f11a0ba9838610c147f70813c17755ab608c7b033f6432c0b434671182c",
      "size": 10004
    },
    {
      "amount_out": 6800150,
      "fee": 100,
      "hash": "4b0366f79ec341cf60d5ef8c9dd8e65974dacb1be1d30dc0bf11d2d9d8240b46",
      "size": 11493
    },
    {
      "amount_out": 7260417,
      "fee": 100,
      "hash": "066b86268b7bb2f780ed76f452d1e6f7213dc6cae273b71fbd4ba378befaed00",
      "size": 12155
    }
  ],
  "transactionsCumulativeSize": 48535
}
```

### daemon.getTransaction(options)

Gets information on the single transaction.

```options.hash``` The transaction hash - *required*

#### Sample Data

```javascript
{
  "block": {
    "cumul_size": 22041,
    "difficulty": 103205633,
    "hash": "62f0058453292af5e1aa070f8526f7642ab6974c6af2c17088c21b31679c813d",
    "height": 500000,
    "timestamp": 1527834137,
    "tx_count": 4
  },
  "status": "OK",
  "tx": {
    "extra": "019e430ecdd501714900c71cb45fd49b4fa77ebd4a68d967cc2419ccd4e72378e3020800000000956710b6",
    "unlock_time": 500040,
    "version": 1,
    "vin": [
      {
        "type": "ff",
        "value": {
          "height": 500000
        }
      }
    ],
    "vout": [
      {
        "amount": 80,
        "target": {
          "data": {
            "key": "5ce69a87940df7ae8443261ff610861d2e4207a7556ef1aa35878c0a5e7e382d"
          },
          "type": "02"
        }
      },
      {
        "amount": 200,
        "target": {
          "data": {
            "key": "7c7f316befaac16ba3782a2ce489e7c0f16c2b733ac0eaa0a72a12ee637822e9"
          },
          "type": "02"
        }
      },
      {
        "amount": 6000,
        "target": {
          "data": {
            "key": "defcb7eb6537bf0a63368ed464df10197e67d7ea8f080e885911cf9ea71abb62"
          },
          "type": "02"
        }
      },
      {
        "amount": 30000,
        "target": {
          "data": {
            "key": "9693e864dba53f308d0b59623c608b6fe16bbdc7cdc75be94f78582d547b46a4"
          },
          "type": "02"
        }
      },
      {
        "amount": 900000,
        "target": {
          "data": {
            "key": "b739e9fbaa3ee976a9ed8ad93a2731ee191c384cf136929e737786573fcd3e96"
          },
          "type": "02"
        }
      },
      {
        "amount": 2000000,
        "target": {
          "data": {
            "key": "5621667d44e7ffb87e5010a5984c188f58a799efb01569e8e42fa2415bb7d14a"
          },
          "type": "02"
        }
      }
    ]
  },
  "txDetails": {
    "amount_out": 2936280,
    "fee": 0,
    "hash": "702ad5bd04b9eff14b080d508f69a320da1909e989d6c163c18f80ae7a5ab832",
    "mixin": 0,
    "paymentId": "",
    "size": 266
  }
}
```

### daemon.getTransactionPool()

Gets the list of transaction hashs in the mempool.

#### Sample Data

```javascript
[
  {
    "amount_out": 1660000,
    "fee": 0,
    "hash": "721ae50994d5446d5683ca79d6fa97dce321a39e88e1df70ae433dc67573841b",
    "size": 13046
  },
  {
    "amount_out": 325000,
    "fee": 0,
    "hash": "fc88004d9cd012c0341506f13003da015efec940cffca0baeff0a381c7846203",
    "size": 28038
  },
  {
    "amount_out": 4040000,
    "fee": 0,
    "hash": "de63292050c73db4bb74637910ceab2aef6b9a0b611d0d93e7a757f9c53f975a",
    "size": 28058
  },
  {
    "amount_out": 10200000,
    "fee": 0,
    "hash": "edcd17184bd0c953be009da6b555e90a7cd5fc596f5f560332382995be7b55a7",
    "size": 28091
  },
  {
    "amount_out": 3380000,
    "fee": 0,
    "hash": "e1846775508a750a2f027db46972114e86866d27d304c9178867ae4616b3723c",
    "size": 28092
  },
  {
    "amount_out": 3960000,
    "fee": 0,
    "hash": "015646a75a5279050b5f02df6d5ff9814860fabc8b093818995a4fb6a33e45d8",
    "size": 28096
  },
  {
    "amount_out": 3860000,
    "fee": 0,
    "hash": "5e2f8bcc8c6c9a74e8ce33a66213711b418633eceeefce50042aecb8544676ba",
    "size": 28097
  }
]
```

### daemon.getBlockCount()

Gets the current block count

#### Sample Data

```javascript
502322
```

### daemon.getBlockHash(options)

Gets a block hash by height.

```options.height``` The height of the block - *required*

#### Sample Data

```text
74a45602da61b8b8ff565b1c81c854416046a23ca53f4416684ffaa60bc50796
```

### daemon.getBlockTemplate(options)

```options.reserveSize``` Reserve size - *required*
```options.walletAddress``` Public Wallet Address - *required*

#### Sample Data

```javascript
{
  "blocktemplate_blob": "0400...0581",
  "difficulty": 194635827,
  "height": 502335,
  "reserved_offset": 412,
  "status": "OK"
}
```

### daemon.submitBlock(options)

```options.blockBlob``` The block blob data - *required*

#### Sample Data

```javascript
{
  "status": "OK"
}
```

### daemon.getLastBlockHeader()

#### Sample Data

```javascript
{
  "block_header": {
    "block_size": 419,
    "depth": 0,
    "difficulty": 200671816,
    "hash": "7d6db7b77232d41c19d898e81c85ecf08c4e8dfa3434f975a319f6261a695739",
    "height": 502345,
    "major_version": 4,
    "minor_version": 0,
    "nonce": 130876,
    "num_txes": 1,
    "orphan_status": false,
    "prev_hash": "5af657331edff98791720c23aacf72e8b6247ddba2a5c42c93984a46946abd14",
    "reward": 2935955,
    "timestamp": 1527907348
  },
  "status": "OK"
}
```

### daemon.getBlockHeaderByHash(options)

```options.hash``` Block hash - *required*

#### Sample Data

```javascript
{
  "block_header": {
    "block_size": 419,
    "depth": 2,
    "difficulty": 200671816,
    "hash": "7d6db7b77232d41c19d898e81c85ecf08c4e8dfa3434f975a319f6261a695739",
    "height": 502345,
    "major_version": 4,
    "minor_version": 0,
    "nonce": 130876,
    "num_txes": 1,
    "orphan_status": false,
    "prev_hash": "5af657331edff98791720c23aacf72e8b6247ddba2a5c42c93984a46946abd14",
    "reward": 2935955,
    "timestamp": 1527907348
  },
  "status": "OK"
}
```

### daemon.getBlockHeaderByHeight(options)

```options.height``` Block height - *required*

#### Sample Data

```javascript
{
  "block_header": {
    "block_size": 419,
    "depth": 2,
    "difficulty": 200671816,
    "hash": "7d6db7b77232d41c19d898e81c85ecf08c4e8dfa3434f975a319f6261a695739",
    "height": 502345,
    "major_version": 4,
    "minor_version": 0,
    "nonce": 130876,
    "num_txes": 1,
    "orphan_status": false,
    "prev_hash": "5af657331edff98791720c23aacf72e8b6247ddba2a5c42c93984a46946abd14",
    "reward": 2935955,
    "timestamp": 1527907348
  },
  "status": "OK"
}
```

### daemon.getCurrencyId()

#### Sample Data

```text
7fb97df81221dd1366051b2d0bc7f49c66c22ac4431d879c895b06d66ef66f4c
```

### daemon.getHeight()

#### Sample Data

```javascript
{
  "height": 502354,
  "network_height": 502354,
  "status": "OK"
}
```

### daemon.getInfo()

#### Sample Data

```javascript
{
"alt_blocks_count": 14,
"difficulty": 289121015,
"grey_peerlist_size": 4997,
"hashrate": 9637367,
"height": 502354,
"incoming_connections_count": 12,
"last_known_block_index": 502352,
"network_height": 502354,
"outgoing_connections_count": 8,
"status": "OK",
"synced": true,
"tx_count": 473486,
"tx_pool_size": 1,
"version": "0.5.0",
"white_peerlist_size": 1000
}
```

### daemon.getTransactions()

#### Sample Data

```javascript
{
  "missed_tx": [],
  "status": "OK",
  "txs_as_hex": []
}
```

### daemon.getPeers()

#### Sample Data

```javascript
{
  "peers": [
    "174.21.179.198:11897",
    "94.23.49.75:11897",
    "...",
    "80.14.183.25:11897",
    "71.193.1.94:11897"
  ],
  "status": "OK"
}
```

## Walletd RPC API Interface

We expose all of the walletd RPC API commands via the ```Walletd``` interface. Each of the below methods are [Javascript Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises). For safety sake, **always** handle your promise catches as we do use them properly.

***Special Note: Any and all amounts/fees will already be in HUMAN readable units. DO NOT DIVIDE THEM AGAIN unless you've specified ```decimalDivisor``` as ```1``` in the options. You have been warned.***

Unless otherwise noted, all methods will resolve the promise upon success and sample return data is supplied below. Any errors will reject the promise with an error condition.

Methods noted having options have parameters that may be *optional* or *required* as documented.

### wallet.reset()

### wallet.save()

### wallet.getViewKey()

#### Example Data

```javascript
{
  "viewSecretKey": "12345678901234567890"
}
```

### wallet.getSpendKeys(options)

#### Parameters

```options.address```: Public Wallet Address - *required*

#### Example Data

```javascript
{
  "spendPublicKey": "9e50b808f1e2522b7c6feddd8e2f6cdcd89ff33b623412de2061d78c84588eff33b6d9",
  "spendSecretKey": "c6639a75a37f63f92e2f096fa262155c943b4fdc243ffb02b8178ab960bb5d0f"
}
```

### wallet.getMnemonicSeed(options)

#### Parameters

```options.address```: Public Wallet Address - *required*

#### Example Data

```text
river nudged peculiar ailments waking null tossed anchor erase jive eavesdrop veered truth wield stacking tattoo unplugs oven wipeout aptitude estate dazed observant oxygen oxygen
```

### wallet.getStatus()

#### Example Data

```javascript
{
  "blockCount": 491214,
  "knownBlockCount": 491215,
  "lastBlockHash": "fc33b0fcdb8a3ed8e2de3cb36df325d67e9926d59f02d164baacf3ddefe8df12",
  "peerCount": 8
}
```

### wallet.getAddresses()

#### Example Data

```javascript
[
  "TRTLux9QBmzCYEGgdWXHEQCAm6vY9vZHkbGmx8ev5LxhYk8N71Pp7PWFYL9CHxpWph2wCPZcJ6tkPfUxVZcUN8xmYsSDJZ25i9n",
  "TRTLv1mPerM2ckUuNvxrkzDE7QKd9PFVUXYbVfbvx8YxB5BYEdSqQvUFYL9CHxpWph2wCPZcJ6tkPfUxVZcUN8xmYsSDJbQMVgF"
]
```

### wallet.createAddress(options)

#### Parameters

```options.secretSpendKey```: Address secret spend key - *optional*

```options.publicSpendKey```: Address public spend key - *optional*

**Note:** Both ```secretSpendKey``` and ```publicSpendKey``` are optional; however, you can only supply one or the other. Both are given below as **examples**.

#### Example Data

```javascript
{
  "address": "TRTLv3rnGMvAdUUPZZxUmm2jSe8j9U4EfXoAzT3NByLTKD4foK6JuH2FYL9CHxpWph2wCPZcJ6tkPfUxVZcUN8xmYsSDJYidUqc"
}
```

### wallet.deleteAddress(options)

#### Parameters

```options.address```: Public address to delete - *required*

### wallet.getBalance(options)

#### Parameters

```options.address```: Public address - *optional*

#### Example Data

```javascript
{
  "availableBalance": 60021.54,
  "lockedAmount": 0
}
```

### wallet.getBlockHashes(options)

#### Parameters

```options.firstBlockIndex```: The height to start with - *required*

```options.blockCount```: How many blocks to return at maximum - *required*

#### Example Data

```javascript
{
  "blockHashes": [
    "8c9738f961a278486f27ce214d1e4d67e08f7400c8b38fe00cdd571a8d302c7d",
    "2ef060801dd27327533580cfa538849f9e1968d13418f2dd2535774a8c494bf4",
    "3ac40c464986437dafe9057f73780e1a3a6cd2f90e0c5fa69c5caab80556a68a",
    "ac821fcb9e9c903abe494bbd2c8f3333602ebdb2f0a98519fc84899906a7f52b",
    "4dcffeea7aec064ec5c03e1cb6cf58265a2b76c4f2db9e5fc4afbaf967b77bba",
    "1b82b0df589cb11aa5a96ea97d79699af7bc54b5d2b8333847d38da660aaf9e0",
    "007de12510667a1d56b61720257f07a3905abb3a8b479bdff926bb17d1a9e766",
    "8f0d10ddf23aafb755e682291d56d38a20bbc17ce1d5081c15067865b6867260",
    "5585c6bac11925fc762d0a8e6b95b3a3bd66379e74e8711e432fda3f6966bf08",
    "ea531b1af3da7dc71a7f7a304076e74b526655bc2daf83d9b5d69f1bc4555af0"
  ]
}
```

### wallet.getTransactionHashes(options)

#### Parameters

```options.addresses```: Array of public addresses to scan for - *optional*

```options.blockHash```: Block hash to scan *optional/required*

```options.firstBlockIndex```: The height to start with - *optional/required*

```options.blockCount```: How many blocks to return at maximum - *required*

```options.paymendId```: Payment ID to scan for - *optional*

***Note:*** Only **one** of either ```blockHash``` or ```firstBlockIndex``` may be supplied, but not both.

#### Example Data

```javascript
{
  "items": [
    {
      "blockHash": "f98d6bbe80a81b3aa0aebd004096e2223524f58f347a1f21be122450f244b948",
      "transactionHashes": [
        "d01e448f7b631cebd989e3a150258b0da59c66f96adecec392bbf61814310751"
      ]
    }
  ]
}
```

### wallet.getTransactions(options)

#### Parameters

```options.addresses```: Array of public addresses to scan for - *optional*

```options.blockHash```: Block hash to scan *optional/required*

```options.firstBlockIndex```: The height to start with - *optional/required*

```options.blockCount```: How many blocks to return at maximum - *required*

```options.paymendId```: Payment ID to scan for - *optional*

***Note:*** Only **one** of either ```blockHash``` or ```firstBlockIndex``` may be supplied, but not both.

#### Example Data

```javascript
[
  {
    "blockHash": "f98d6bbe80a81b3aa0aebd004096e2223524f58f347a1f21be122450f244b948",
    "transactionAmount": 10.5,
    "blockIndex": 469419,
    "extra": "014fa15a893c92e040fc97c8bda6d811685a269309b37ad444755099cbed6d8438",
    "fee": 0.1,
    "isBase": false,
    "paymentId": "",
    "state": 0,
    "timestamp": 1526876765,
    "transactionHash": "d01e448f7b631cebd989e3a150258b0da59c66f96adecec392bbf61814310751",
    "address": "TRTLv2MXbzaPYVYqtdNwYpKY7azcVjBjsETN188BpKwi2q83NibqJWtFYL9CHxpWph2wCPZcJ6tkPfUxVZcUN8xmYsSDJYpcE3D",
    "amount": 10.5,
    "type": 0,
    "unlockTime": 0,
    "inbound": true
  }
]
```

### wallet.getUnconfirmedTransactionHashes(options)

#### Parameters

```options.addresses```: Array of public address to scan for - *optional*

#### Example Data

```javascript
{
  "transactionHashes": [
    "80185093fj029jv029j3g092jb32904j0b34jb34gb",
    "j09213fj20vjh02vb2094jb0394jgb039bj03jb34b"
  ]
}
```

### wallet.getTransaction(options)

***Special Note: Any and all amounts/fees will already be in HUMAN readable units. DO NOT DIVIDE AMOUNTS AGAIN unless you've specified ```decimalDivisor``` as ```1``` in the options. You have been warned.***

#### Parameters

```options.transactionHash```: The hash of the transaction - *required*

#### Example Data

```javascript
{
  "transaction": {
    "amount": 10,
    "blockIndex": 469419,
    "extra": "014fa15a893c92e040fc97c8bda6d811685a269309b37ad444755099cbed6d8438",
    "fee": 0.1,
    "isBase": false,
    "paymentId": "",
    "state": 0,
    "timestamp": 1526876765,
    "transactionHash": "d01e448f7b631cebd989e3a150258b0da59c66f96adecec392bbf61814310751",
    "transfers": [
      {
        "address": "TRTLv2MXbzaPYVYqtdNwYpKY7azcVjBjsETN188BpKwi2q83NibqJWtFYL9CHxpWph2wCPZcJ6tkPfUxVZcUN8xmYsSDJYpcE3D",
        "amount": 10,
        "type": 0
      },
      {
        "address": "",
        "amount": -20,
        "type": 0
      },
      {
        "address": "",
        "amount": 9.9,
        "type": 0
      }
    ],
    "unlockTime": 0
  }
}
```

### wallet.newTransfer(address, amount)

This method creates a transfer object designed to be used with *wallet.sendTransaction*

***Special Note: Any and all amounts/fees will already be in HUMAN readable units. DO NOT SUPPLY NATIVE CURRENCY AMOUNTS unless you've specified ```decimalDivisor``` as ```1``` in the options. You have been warned.***

### wallet.sendTransaction(options)

***Special Note: Any and all amounts/fees will already be in HUMAN readable units. DO NOT SUPPLY NATIVE CURRENCY AMOUNTS unless you've specified ```decimalDivisor``` as ```1``` in the options. You have been warned.***

#### Parameters

```options.addresses```: Array of addresses to use for the *inputs* - *optional*

```options.transfers```: Array of transfer objects (see *wallet.newTransfer*) to send funds to - *required*

```options.fee```: Fee we are willing to pay for the transaction. Ex: 0.1 - *optional*

```options.unlockTime```: Blockheight to unlock the transaction at, the UTC timestamp, or ```0``` for now. - *optional*

```options.mixin```: Mixins to use - *optional*

```options.extra```: Extra data to put in the transaction - *optional*

```options.paymentId```: The payment ID for the transaction - *optional*

```options.changeAddress```: Where to send any change from the transaction to. If not specified, the first address in the wallet container is used. - *optional*

#### Example Data

```javascript
{
  "transactionHash": "93faedc8b8a80a084a02dfeffd163934746c2163f23a1b6022b32423ec9ae08f"
}
```

### wallet.createDelayedTransaction(options)

***Special Note: Any and all amounts/fees will already be in HUMAN readable units. DO NOT SUPPLY NATIVE CURRENCY AMOUNTS unless you've specified ```decimalDivisor``` as ```1``` in the options. You have been warned.***

#### Parameters

```options.addresses```: Array of addresses to use for the *inputs* - *optional*

```options.transfers```: Array of transfer objects (see *wallet.newTransfer*) to send funds to - *required*

```options.fee```: Fee we are willing to pay for the transaction. Ex: 0.1 - *optional*

```options.unlockTime```: Blockheight to unlock the transaction at, the UTC timestamp, or ```0``` for now. - *optional*

```options.mixin```: Mixins to use - *optional*

```options.extra```: Extra data to put in the transaction - *optional*

```options.paymentId```: The payment ID for the transaction - *optional*

```options.changeAddress```: Where to send any change from the transaction to. If not specified, the first address in the wallet container is used. - *optional*

#### Example Data

```javascript
{
  "transactionHash": "93faedc8b8a80a084a02dfeffd163934746c2163f23a1b6022b32423ec9ae08f"
}
```

### wallet.getDelayedTransactionHashes()

#### Example Data

```javascript
{
  "transactionHashes": [
    "957dcbf54f327846ea0c7a16b2ae8c24ba3fa8305cc3bbc6424e85e7d358b44b",
    "25bb751814dd39bf46c972bd760e7516e34200f5e5dd02fda696671e11201f78"
  ]
}
```

### wallet.deleteDelayedTransaction(options)

#### Parameters

```options.transactionHash```: The hash of the transaction - *required*

### wallet.sendDelayedTransaction()

#### Parameters

```options.transactionHash```: The hash of the transaction - *required*

### wallet.sendFusionTransaction(options)

#### Parameters

```options.threshold```: The minimum fusion threshold amount - *optional*

```options.mixin```: Mixins to use - *optional*

```options.addresses```: Array of addresses to use for the *inputs* - *optional*

```options.destinationAddress```: The address to send the fusion transaction to - *optional/required*

***Note:*** If the container has only one address or ```addressess``` consists of one address, then ```destinationAddress``` need not be supplied. Otherwise, ```destinationAddress``` is required.

#### Example Data

```javascript
{
  "transactionHash": "93faedc8b8a80a084a02dfeffd163934746c2163f23a1b6022b32423ec9ae08f"
}
```

### wallet.estimateFusion(options)

#### Parameters

```options.threshold```: The minimum fusion threshold amount - *optional*

```options.addresses```: Array of addresses to use for the *inputs* - *optional*

#### Example Data

```javascript
{
  "fusionReadyCount": 0,
  "totalOutputCount": 19
}
```