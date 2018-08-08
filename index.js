var version = require('./package.json').version;
var networks = require('./src/networks');
var transaction = require('./src/transaction');
var wallet = require('./src/wallet');
var endpoints = require('./src/endpoints');

module.exports = {
    NewTransaction: transaction.NewTransaction,
    NewTokenTransaction: transaction.NewTokenTransaction,
    NewWallet: wallet.NewWallet,
    Endpoints: endpoints,
    Networks: networks,
    version: version,
};