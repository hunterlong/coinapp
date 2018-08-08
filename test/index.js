const CoinApp = require('../index');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;

global.before(() => {
    chai.should();
    chai.use(chaiAsPromised);
});


describe("CoinApp() Functions", function() {

    it('view index version', function () {
        expect(CoinApp.version).to.equal("0.0.1")
    });


    it('view index version', function () {
        let wallet = CoinApp.NewWallet("eth", "0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d");
        expect(wallet).to.be.fulfilled
            .then(function(d) {
                return expect(d.address).to.equal("0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1")
            });
    });

});