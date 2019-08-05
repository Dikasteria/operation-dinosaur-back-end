const { expect } = require("chai");
const { fetchUserIdFromAmazonId } = require('../utils/db_call_utils')

const dbTests = describe.only('dbUtilTests', () => {
    it('returns false on an empty amazonId', () => {
        return fetchUserIdFromAmazonId()
            .then(results => {
                expect(results).to.be.false
            })
    });
    it('retieves an id', () => {
        return fetchUserIdFromAmazonId('a1234')
            .then(results => {
                expect(results).to.equal(1)
            })
    });
    it('returns false on a non existant id', () => {
        return fetchUserIdFromAmazonId('bacon')
            .then(results => {
                expect(results).to.be.false
            })
    });
});

module.exports = dbTests