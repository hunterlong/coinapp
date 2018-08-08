const CoinTransaction = require('../src/transaction');
const CoinWallet = require('../src/wallet');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;

global.before(() => {
    chai.should();
    chai.use(chaiAsPromised);
});


describe("CoinTransaction() Functions", function() {

    it('create an ethereum transaction', function() {
        let newTx = CoinTransaction.NewTransaction("eth", "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1", "0xEac8E27930E7D20795FBB465D0e48D48b9F8137e", 10000000000);
        return expect(newTx).to.be.fulfilled
            .then(function(d) {
                expect(d.to).to.equal("0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1");
                expect(d.value).to.equal("0x2540be400");
            }).catch(function(e) {
                console.log(e);
            });
    });


    it('create an erc20 token transaction', function() {
        let newTx = CoinTransaction.NewTokenTransaction("eth", "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1", "0xEac8E27930E7D20795FBB465D0e48D48b9F8137e", "0xEac8E27930E7D20795FBB465D0e48D48b9F8137e", 10000000000, 8);
        return expect(newTx).to.be.fulfilled
            .then(function(d) {
                expect(d.to).to.equal("0xEac8E27930E7D20795FBB465D0e48D48b9F8137e");
                expect(d.data).to.equal("0xa9059cbb00000000000000000000000090f8bf6a479f320ead074411a4b0e7944ea8c9c10000000000000000000000000000000000000000000000000de0b6b3a7640000");
            }).catch(function(e) {
                console.log(e);
            });
    });


    it('create an bitcoin testnet transaction', function() {
        let wallet = CoinWallet.NewWallet("btctest", "cVjvf8BCufNkiNVKdBtzAcqE44WG5bedw5d7nDNuMxUMNKR4srr1");
        return expect(wallet).to.be.fulfilled
            .then(function(fromWallet) {
                let newTx = CoinTransaction.NewTransaction("btctest", "muvvhtaYDV1SpRPARHdtruG3nBv38MtS3C", fromWallet, 1000);
                return expect(newTx).to.be.fulfilled
                    .then(function(d) {
                        expect(d.signed).to.equal("020000000104c99298dc678b5b14d46eafa792310500be85bc03b64877bde736cf3d5f592a010000006b483045022100e4a79ce91008369ec6e7ce62d1f0156830a281e9a79b38d55a29f4ed478fe3cd0220755133f40808eb664b28c08f065bcd04cc071f332e61dd69f90304d3910a560d012102dc9917af3fb21fa02fbbd9643f8ff3ccdec11f363004cf9845dd78b9622beca5ffffffff02e8030000000000001976a9149e1a6ae7af5c7f84c26d2223824fbce201a4495a88ac16bb0100000000001976a9149e1a6ae7af5c7f84c26d2223824fbce201a4495a88ac00000000");
                        expect(d.to).to.equal("muvvhtaYDV1SpRPARHdtruG3nBv38MtS3C");
                        expect(d.from).to.equal("muvvhtaYDV1SpRPARHdtruG3nBv38MtS3C");
                    }).catch(function(e) {
                        console.log(e);
                    })
            });
    });


    it('create an litecoin testnet transaction', function() {
        let wallet = CoinWallet.NewWallet("ltctest", "cVjvf8BCufNkiNVKdBtzAcqE44WG5bedw5d7nDNuMxUMNKR4srr1");
        return expect(wallet).to.be.fulfilled
            .then(function(fromWallet) {
                let newTx = CoinTransaction.NewTransaction("ltctest", "muvvhtaYDV1SpRPARHdtruG3nBv38MtS3C", fromWallet, 1000);
                return expect(newTx).to.be.fulfilled
                    .then(function(d) {
                        expect(d.signed).to.equal("020000000232e044a2e1b65b08bba3fc815fe1e34d3190ad457860640fa2c1a2dd913232d9010000006b483045022100d43c1eaf1438597ce36e399c44ef3ada33da1427e5275fedd9fa3c046c9fd19502205cf96f32471d5c82324cb653d529ebefaf794ab68a57a5548cc0ff69b0859709012102dc9917af3fb21fa02fbbd9643f8ff3ccdec11f363004cf9845dd78b9622beca5ffffffff32e044a2e1b65b08bba3fc815fe1e34d3190ad457860640fa2c1a2dd913232d9000000006b483045022100824894b41a3ea904333775c0844eea1636baa831f9927f4e75f6a4fc36ebc6550220485549756a29dc23748930c91a63078998a8abbb766958eaac6b0f5b8727d793012102dc9917af3fb21fa02fbbd9643f8ff3ccdec11f363004cf9845dd78b9622beca5ffffffff02e8030000000000001976a9149e1a6ae7af5c7f84c26d2223824fbce201a4495a88ac489b5623010000001976a9149e1a6ae7af5c7f84c26d2223824fbce201a4495a88ac00000000");
                        expect(d.to).to.equal("muvvhtaYDV1SpRPARHdtruG3nBv38MtS3C");
                        expect(d.from).to.equal("muvvhtaYDV1SpRPARHdtruG3nBv38MtS3C");
                    }).catch(function(e) {
                        console.log(e);
                    })
            });
    });

    // it('create an token transaction', function() {
    //     let tx =  CoinTransaction.NewTokenTransaction("ropsten", "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1", "0xEac8E27930E7D20795FBB465D0e48D48b9F8137e", "0xEac8E27930E7D20795FBB465D0e48D48b9F8137e", 10000);
    //     expect(tx.value).to.equal("0x0");
    //     expect(tx.data).to.equal("0xa9059cbb000000000000000000000000eac8e27930e7d20795fbb465d0e48d48b9f8137e000000000000000000000000000000000000000000000000000000e8d4a51000");
    // });


});

