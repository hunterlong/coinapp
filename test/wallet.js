const CoinWallet = require('../src/wallet');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;

global.before(() => {
    chai.should();
    chai.use(chaiAsPromised);
});

let btcTestWallet;

describe("CoinWallet() Functions", function() {

    it('make new Etheruem wallet', function() {
        let wallet = CoinWallet.NewWallet("eth", "4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d");
        return expect(wallet).to.be.fulfilled
            .then(function(d) {
                expect(d.balance()).to.be.fulfilled
                    .then(function(bal) {
                        return expect(bal).to.equal(0);
                    });
                expect(d.address).to.equal("0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1");
                expect(d.coin).to.equal("ETH");
            });
    });


    it('make new Ropsten wallet', function() {
        let wallet = CoinWallet.NewWallet("ropsten", "4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d");
        return expect(wallet).to.be.fulfilled
            .then(function(d) {
                expect(d.balance()).to.be.fulfilled
                    .then(function(bal) {
                        return expect(bal).to.equal(2840525302208165000);
                    });
                expect(d.address).to.equal("0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1");
                expect(d.coin).to.equal("ROPSTEN");
            });
    });

    it('make new Bitcoin wallet', function() {
        let wallet = CoinWallet.NewWallet("btc", "L1vv1jRRbenk1CN8tBkFhqTUbw78VBs8FaAEnZFVksS42z3YXnyt");
        return expect(wallet).to.be.fulfilled
            .then(function(d) {
                expect(d.utxos()).to.be.fulfilled
                    .then(function(utxos) {
                        return expect(utxos.length).to.equal(0);
                    });
                expect(d.balance()).to.be.fulfilled
                    .then(function(bal) {
                        return expect(bal).to.equal(0);
                    }).catch(function(e) {
                        console.log(e);
                    return expect(e).to.equal(0);
                });
                expect(d.address).to.equal("1L99qwuiz75wShPAZT1kzvQQYy27w4hUw5");
                expect(d.coin).to.equal("BTC");
            });
    });

    it('make new Bitcoin Test wallet', function() {
        let wallet = CoinWallet.NewWallet("btctest", "cVjvf8BCufNkiNVKdBtzAcqE44WG5bedw5d7nDNuMxUMNKR4srr1");
        return expect(wallet).to.be.fulfilled
            .then(function (d) {
                btcTestWallet = d;
                expect(d.utxos()).to.be.fulfilled
                    .then(function (utxos) {
                        return expect(utxos.length).to.equal(1);
                    });
                expect(d.balance()).to.be.fulfilled
                    .then(function (bal) {
                        return expect(bal).to.equal(114930);
                    }).catch(function(e) {
                   console.log(e);
                });
            });
        expect(d.address).to.equal("muvvhtaYDV1SpRPARHdtruG3nBv38MtS3C");
        expect(d.coin).to.equal("BTCTEST");
    });


    it('make new Bitcoin Cash wallet', function() {
        let wallet = CoinWallet.NewWallet("bch", "L1vv1jRRbenk1CN8tBkFhqTUbw78VBs8FaAEnZFVksS42z3YXnyt");
        return expect(wallet).to.be.fulfilled
            .then(function(d) {
                expect(d.address).to.equal("1L99qwuiz75wShPAZT1kzvQQYy27w4hUw5");
                expect(d.coin).to.equal("BCH");
            });
    });

    it('make new Bitcoin Cash Testnet wallet', function() {
        let wallet = CoinWallet.NewWallet("bchtest", "cVjvf8BCufNkiNVKdBtzAcqE44WG5bedw5d7nDNuMxUMNKR4srr1");
        return expect(wallet).to.be.fulfilled
            .then(function(d) {
                expect(d.utxos()).to.be.fulfilled
                    .then(function(utxos) {
                        return expect(utxos.length).to.equal(0);
                    });
                expect(d.balance()).to.be.fulfilled
                    .then(function(bal) {
                        return expect(bal).to.equal(0);
                    }).catch(function(e) {
                    console.log(e);
                    return expect(e).to.equal(0);
                });
                expect(d.address).to.equal("muvvhtaYDV1SpRPARHdtruG3nBv38MtS3C");
                expect(d.coin).to.equal("BCHTEST");
            });
    });

    it('make new Litecoin wallet', function() {
        let wallet = CoinWallet.NewWallet("ltc", "T9GW6YBuQiqQ5sY6kokKCAb3MBsy94jisPapwoe7juxDYfgKvDye");
        return expect(wallet).to.be.fulfilled
            .then(function(d) {
                expect(d.utxos()).to.be.fulfilled
                    .then(function(utxos) {
                        return expect(utxos.length).to.equal(0);
                    });
                expect(d.balance()).to.be.fulfilled
                    .then(function(bal) {
                        return expect(bal).to.equal(0);
                    }).catch(function(e) {
                    console.log(e);
                });
                expect(d.address).to.equal("LMHKBWBKXhfqpTg6cJoti1zyUvMYSSLkKP");
                expect(d.coin).to.equal("LTC");
            });
    });

    it('make new Litecoin Test wallet', function() {
        let wallet = CoinWallet.NewWallet("ltctest", "cVjvf8BCufNkiNVKdBtzAcqE44WG5bedw5d7nDNuMxUMNKR4srr1");
        return expect(wallet).to.be.fulfilled
            .then(function(d) {
                expect(d.utxos()).to.be.fulfilled
                    .then(function(utxos) {
                        return expect(utxos.length).to.equal(2);
                    });
                expect(d.balance()).to.be.fulfilled
                    .then(function(bal) {
                        return expect(bal).to.equal(4887847204);
                    }).catch(function(e) {
                    console.log(e);
                });
                expect(d.address).to.equal("muvvhtaYDV1SpRPARHdtruG3nBv38MtS3C");
                expect(d.coin).to.equal("LTCTEST");
            });
    });


    it('make new Doge wallet', function() {
        let wallet = CoinWallet.NewWallet("doge", "QWNedECC794ZFVRYpDacxBLxnCKArRmw9Rv2KAmcCiKSWBrc9h3R");
        return expect(wallet).to.be.fulfilled
            .then(function(d) {
                expect(d.address).to.equal("D9WjPFNQs8L2DQLRSaDmZzgPScPxUMxGem");
                expect(d.coin).to.equal("DOGE");
            });
    });

    it('make new Dash wallet', function() {
        let wallet = CoinWallet.NewWallet("dash", "XEVfXKmeos8fPh9BdJyex9QnYas21pTdxu9D3yCdSWfbTkdL9p7J");
        return expect(wallet).to.be.fulfilled
            .then(function(d) {
                expect(d.address).to.equal("XkZHUiM28GouvoJCcY94vFPKWeqGkdqn2j");
                expect(d.coin).to.equal("DASH");
            });
    });

});

