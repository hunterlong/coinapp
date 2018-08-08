const ethers = require('ethers');
const Wallet = ethers.Wallet;
const bitcoin = require('bitcoinjs-lib');
const networks = require('./networks');
const CoinTransaction = require('./transaction');
const Endpoints = require('./endpoints');
const ledger = require('ledgerco');
const Web3 = require('web3');
var request = require('request');

var web3 = new Web3(new Web3.providers.HttpProvider("https://eth.coinapp.io"));


CoinWallet.prototype = {
    balance: function() { return WalletBalance(this) },

    pendingBalance: async function() {
        return await AccountBalance(this.address);
    },
    nonce: function() { return Nonce(this.address) },
    transactions: function() {
        return [];
    },
    utxos: function() { return GetUTXO(this) },
    signTransaction: function(tx) {
        if (typeof tx !== CoinTransaction.constructor) { return "incorrect transaction object" }
        if (this.coin==="ETH" || this.coin==="ROPSTEN") {
            return this.w.sign(tx);
        } else if (this.ledger) {
            // sign on ledger

        } else {
            return tx.sign(this.w.key, this.w.address);
        }
    },
    toJSON: function() {
        return JSON.stringify(this);
    },
};

function CoinWallet(w) {
    this.address = w.address;
    this.private = w.priv;
    this.network = w.network;
    this.chain = w.chain;
    this.ledger = (w.ledger===true);
    this.index = (w.index || 0);
    this.isBtc = w.isBtc;
    this.api = w.api;
    this.coin = w.coin.toUpperCase();
    this.w = w.w;
}


function NewWeb3(url) {
    web3 = new Web3(new Web3.providers.HttpProvider(url));
    return web3
}


function NewWallet(coin, key) {
    return new Promise(function(resolve, reject) {
        switch (coin) {
            case "eth":
                UnlockETHPrivateKey(coin, key).then(function (wdata) {
                    w = {
                        address: wdata.address,
                        priv: key,
                        network: ethers.networks.mainnet,
                        chain: 1,
                        coin: coin.toUpperCase(),
                        w: wdata,
                        api: Endpoints.eth,
                        isBtc: false,
                    };
                    web3 = new Web3(new Web3.providers.HttpProvider(w.api));
                    resolve(new CoinWallet(w));
                });
                break;
            case "ropsten":
                UnlockETHPrivateKey(coin, key).then(function (wdata) {
                    w = {
                        address: wdata.address,
                        priv: key,
                        network: ethers.networks.testnet,
                        chain: 3,
                        coin: coin.toUpperCase(),
                        w: wdata,
                        api: Endpoints.ropsten,
                        isBtc: false,
                    };
                    web3 = new Web3(new Web3.providers.HttpProvider(w.api));
                    resolve(new CoinWallet(w));
                });
                break;
            case "btc":
                UnlockBTCPrivateKey(coin, key).then(function (wdata) {
                    w = {
                        address: wdata.address,
                        priv: wdata.toWIF(),
                        network: networks.bitcoin,
                        coin: coin.toUpperCase(),
                        w: wdata,
                        api: Endpoints.btc,
                        isBtc: true,
                    };
                    resolve(new CoinWallet(w));
                });
                break;
            case "btctest":
                UnlockBTCPrivateKey(coin, key).then(function (wdata) {
                    w = {
                        address: wdata.address,
                        priv: wdata.toWIF(),
                        network: networks.testnet,
                        coin: coin.toUpperCase(),
                        w: wdata,
                        api: Endpoints.btctest,
                        isBtc: true,
                    };
                    resolve(new CoinWallet(w));
                });
                break;
            case "bch":
                UnlockBTCPrivateKey(coin, key).then(function (wdata) {
                    w = {
                        address: wdata.address,
                        priv: wdata.toWIF(),
                        network: networks.bitcoincash,
                        coin: coin.toUpperCase(),
                        w: wdata,
                        api: Endpoints.bch,
                        isBtc: true,
                    };
                    resolve(new CoinWallet(w));
                });
                break;
            case "bchtest":
                UnlockBTCPrivateKey(coin, key).then(function (wdata) {
                    w = {
                        address: wdata.address,
                        priv: wdata.toWIF(),
                        network: networks.bitcoincashtestnet,
                        coin: coin.toUpperCase(),
                        w: wdata,
                        api: Endpoints.bchtest,
                        isBtc: true,
                    };
                    resolve(new CoinWallet(w));
                });
                break;
            case "ltc":
                UnlockBTCPrivateKey(coin, key).then(function (wdata) {
                    w = {
                        address: wdata.address,
                        priv: wdata.toWIF(),
                        network: networks.litecoin,
                        coin: coin.toUpperCase(),
                        w: wdata,
                        api: Endpoints.ltc,
                        isBtc: true,
                    };
                    resolve(new CoinWallet(w));
                });
                break;
            case "ltctest":
                UnlockBTCPrivateKey(coin, key).then(function (wdata) {
                    w = {
                        address: wdata.address,
                        priv: wdata.toWIF(),
                        network: networks.litecointest,
                        coin: coin.toUpperCase(),
                        w: wdata,
                        api: Endpoints.ltctest,
                        isBtc: true,
                    };
                    resolve(new CoinWallet(w));
                });
                break;
            case "zcash":
                UnlockBTCPrivateKey(coin, key).then(function (wdata) {
                    w = {
                        address: wdata.address,
                        priv: wdata.toWIF(),
                        network: networks.zcash,
                        coin: coin.toUpperCase(),
                        w: wdata,
                        api: Endpoints.ltc,
                        isBtc: true,
                    };
                    resolve(new CoinWallet(w));
                });
                break;
            case "doge":
                UnlockBTCPrivateKey(coin, key).then(function (wdata) {
                    w = {
                        address: wdata.address,
                        priv: wdata.toWIF(),
                        network: networks.dogecoin,
                        coin: coin.toUpperCase(),
                        w: wdata,
                        api: Endpoints.ltc,
                        isBtc: true,
                    };
                    resolve(new CoinWallet(w));
                });
                break;
            case "dash":
                UnlockBTCPrivateKey(coin, key).then(function (wdata) {
                    w = {
                        address: wdata.address,
                        priv: wdata.toWIF(),
                        network: networks.dash,
                        coin: coin.toUpperCase(),
                        w: wdata,
                        api: Endpoints.ltc,
                        isBtc: true,
                    };
                    resolve(new CoinWallet(w));
                });
                break;
            default:
                reject("no wallet created")
        }
    });
}



function UnlockWalletKeystore(filename, password) {
    return new Promise(function (resolve, reject) {
        OpenFile(filename).then(function (walletData) {
            if (password != '' && walletData != '' && Wallet.isEncryptedWallet(walletData)) {
                Wallet.fromEncryptedWallet(walletData, password).then(function (wallet) {
                    resolve(wallet);
                });
            } else {
                reject("incorrect wallet type")
            }
        });
    });
}


function UnlockBTCPrivateKey(coin, key) {
    return new Promise(function (resolve, reject) {
        var network = networks.bitcoin;
        if(coin === "btc") {
            network = networks.bitcoin;
        } else if(coin === "btctest") {
            network = networks.testnet;
        } else if(coin === "bch") {
            network = networks.bitcoincash;
        } else if(coin === "bchtest") {
            network = networks.bitcoincashtestnet;
        } else if(coin === "ltc") {
            network = networks.litecoin;
        } else if(coin === "ltctest") {
            network = networks.litecointest;
        } else if(coin === "doge") {
            network = networks.dogecoin;
        } else if(coin === "zcash") {
            network = networks.zcash;
        } else if(coin === "dash") {
            network = networks.dash;
        }
        var wallet = bitcoin.ECPair.fromWIF(key, network);
        const { address } = bitcoin.payments.p2pkh({ network: network, pubkey: wallet.publicKey });
        wallet.address = address;
        wallet.network = network;
        wallet.coin = coin.toUpperCase();
        resolve(wallet);
    });
}


function UnlockETHPrivateKey(coin, key) {
    return new Promise(function (resolve, reject) {
        if(key.substring(0, 2) !== '0x') {
            key = '0x' + key;
        }
        var wallet = new Wallet(key);
        if (wallet.address === "") {
            reject("incorrect ethereum key")
        }
        resolve(wallet);
    });
}


function Nonce(address) {
    return new Promise(function(resolve, reject) {
        web3.eth.getTransactionCount(address).then(function (nonce) {
            resolve(nonce)
        }).catch(function(e) {
            reject(e)
        });
    });
}

function AccountBalance(address) {
    return new Promise(function(resolve, reject) {
        web3.eth.getBalance(address).then(function(bal) {
            resolve(parseInt(bal))
        }).catch(function(e){
            reject(e);
        });
    });
}


function WalletBalance(wallet) {
    return new Promise(function(resolve, reject) {
        if (wallet.coin==="ETH" || wallet.coin==="ROPSTEN") {
            resolve(AccountBalance(wallet.address))
        } else {
            resolve(BitcoinBalance(wallet))
        }
    });
}


function BitcoinBalance(wallet) {
    return new Promise(function(resolve, reject) {
        let url = wallet.api+"/addr/"+wallet.address+"/balance";
        request(url, function (error, response, body) {
            if (error) { reject(error) }
            resolve(parseInt(body));
        })
    });
}


function GetUTXO(wallet) {
    return new Promise(function(resolve, reject) {
        let url = wallet.api+"/addr/"+wallet.address+"/utxo";
        request(url, function (error, response, body) {
            if (error) { reject(error) }
            resolve(JSON.parse(body));
        })
    });
}


function signTx(wallet) {

}

module.exports = {
    NewWallet,
    Nonce,
};