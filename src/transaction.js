const ethers = require('ethers');
const web3 = require('web3');
const CoinWallet = require('./wallet');
const Tx = require('ethereumjs-tx');
var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');


function CoinTransaction(w) {
    this.coin = w.coin;
    this.to = w.to;
    this.from = w.from;
    this.contract = w.contract;
    this.value = w.value;
    this.data = w.data;
    this.unsigned = w.unsigned;
    this.decimals = w.decimals;
    this.signed = w.signed;
    this.gasLimit = 21000;
    this.gasPrice = 1;
    this.size = 0;
    this.fee = 0;
}


CoinTransaction.prototype = {
    amount: function() {
        return "ok"
    },
    sign: function(from) {

    },
    broadcast: function() {

    },
    toJSON: function() {
        return JSON.stringify(this);
    },
};


function NewTransaction(coin, to, from, amount, data='0x', price=1, limit=21000) {
    return new Promise(function(resolve, reject) {
        if (coin.toUpperCase() === "ETH" || coin.toUpperCase() === "ROPSTEN") {
            newETHTransaction(coin, to, from, amount, data, price, limit).then(function (newTx) {
                resolve(new CoinTransaction(newTx));
            }).catch(function(e) {
                reject(e);
            });
        } else {
            newBTCTransaction(to, from, amount).then(function (newTx) {
                resolve(new CoinTransaction(newTx));
            }).catch(function(e) {
                reject(e);
            });
        }
    });
}


function newETHTransaction(coin, to, from, amount, data, price, limit) {
    return new Promise(function(resolve, reject) {
        CoinWallet.Nonce(from).then(function (nonce) {
            var gasPrice = parseInt(price) * 1000000000;
            // var data = FormatTransfer(tx.to, tx.value);
            var txObj = {
                nonce: web3.utils.toHex(nonce),
                gasPrice: web3.utils.toHex(gasPrice),
                gasLimit: web3.utils.toHex(limit),
                to: to,
                value: web3.utils.toHex(amount),
                data: web3.utils.toHex(data),
                r: "0x00",
                s: "0x00",
                v: "0x0" + ethChain(coin)
            };
            var txToSign = new Tx(txObj).serialize().toString('hex');
            txObj.unsigned = txToSign;
            resolve(txObj)
        }).catch(function(e) {
            reject(e);
        });
    });
}


function newBTCTransaction(to, from, amount) {
    return new Promise(function (resolve, reject) {
        var tx = new bitcoin.TransactionBuilder(from.network);

        from.balance().then(function (balance) {
            from.utxos().then(function (utxos) {
                utxos.forEach(function (out, k) {
                    tx.addInput(out.txid, out.vout);
                });

                let remaining = parseInt(balance) - parseInt(amount) - 500;

                tx.addOutput(to, parseInt(amount));
                tx.addOutput(from.address, parseInt(remaining));

                utxos.forEach(function (out, k) {
                    tx.sign(k, from.w);
                });

                var tx_hex = tx.build().toHex();

                var transaction = {
                    to: to,
                    from: from.address,
                    value: amount,
                    decimals: 8,
                    signed: tx_hex,
                    fee: 500,
                };

                resolve(transaction);

            });

        });

    });
}


function newTokenTransaction(coin, to, from, contract, amount, decimals, price=1, limit=55000) {
    return new Promise(function(resolve, reject) {
        CoinWallet.Nonce(from).then(function (nonce) {
            var gasPrice = parseInt(price) * 1000000000;
            var data = FormatTransfer(to, amount, decimals);
            var txObj = {
                nonce: web3.utils.toHex(nonce),
                gasPrice: web3.utils.toHex(gasPrice),
                gasLimit: web3.utils.toHex(limit),
                to: contract,
                value: web3.utils.toHex(0),
                data: data,
                r: "0x00",
                s: "0x00",
                v: "0x0" + ethChain(coin)
            };
            var txToSign = new Tx(txObj).serialize().toString('hex');
            txObj.unsigned = txToSign;
            resolve(txObj)
        }).catch(function(e) {
            reject(e);
        });
    });
}


function ethChain(coin) {
    if (coin==='ETH') {
        return 1
    } else {
        return 3
    }
}

function NewTokenTransaction(coin, to, from, contract, decimals, amount) {
    return new Promise(function(resolve, reject) {
        newTokenTransaction(coin, to, from, contract, decimals, amount).then(function (x) {
            resolve(new CoinTransaction(x));
        });
    });
}

function FormatTransfer(to, amount, decimals) {
    var method = "0xa9059cbb";
    var dataAmount = ethers.utils.parseUnits(amount.toString(), decimals).toString();
    dataAmount = parseInt(dataAmount).toString(16).pad(64);
    var dataAddress = ethers.utils.getAddress(to).substring(2, 42).pad(64);
    return (method + dataAddress + dataAmount).toLowerCase();
}


String.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}


module.exports = {
    NewTransaction,
    NewTokenTransaction,
};