const { expect } = require("chai");
const { formatDate, add24Hours } = require("../utils");


const utilsTests = describe('Utils functions', () => {
  describe("formatDate", () => {
    it("returns a new array", () => {
      const input = [];
      const expected = [];
      const actual = formatDate(input, "created_at");
      expect(actual).to.eql(expected);
      expect(actual).not.to.equal(expected);
    });
    it("formats one object", () => {
      const input = [
        {
          title: "Living in the shadow of a great man",
          created_at: 1542284514171
        }
      ];
      const expected = [
        {
          title: "Living in the shadow of a great man",
          created_at: new Date(1542284514171)
        }
      ];
      const actual = formatDate(input, "created_at");
      expect(actual).to.eql(expected);
    });
    it("formats all objects", () => {
      const input = [
        {
          title: "Living in the shadow of a great man",
          created_at: 1542284514171
        },
        {
          title: "Sony Vaio; or, The Laptop",
          created_at: 1416140514171
        },
        {
          title: "Eight pug gifs that remind me of mitch",
          created_at: 1289996514171
        }
      ];
      const expected = [
        {
          title: "Living in the shadow of a great man",
          created_at: new Date(1542284514171)
        },
        {
          title: "Sony Vaio; or, The Laptop",
          created_at: new Date(1416140514171)
        },
        {
          title: "Eight pug gifs that remind me of mitch",
          created_at: new Date(1289996514171)
        }
      ];
      const actual = formatDate(input, "created_at");
      expect(actual).to.eql(expected);
    });
    it("formats all given key name", () => {
      const input = [
        {
          title: "Living in the shadow of a great man",
          timestamp: 1542284514171
        },
        {
          title: "Sony Vaio; or, The Laptop",
          timestamp: 1416140514171
        },
        {
          title: "Eight pug gifs that remind me of mitch",
          timestamp: 1289996514171
        }
      ];
      const expected = [
        {
          title: "Living in the shadow of a great man",
          timestamp: new Date(1542284514171)
        },
        {
          title: "Sony Vaio; or, The Laptop",
          timestamp: new Date(1416140514171)
        },
        {
          title: "Eight pug gifs that remind me of mitch",
          timestamp: new Date(1289996514171)
        }
      ];
      const actual = formatDate(input, "timestamp");
      expect(actual).to.eql(expected);
    });
  });
  describe('add24Hours', () => {
    it('returns false if given an empty string', () => {
      expect(add24Hours('')).to.be.false
    });
    it('adds a day to the time, without month overflow', () => {
      expect(add24Hours('2019-07-29T15:00:00.000Z')).to.equal('2019-07-30T15:00:00.000Z')
    })
    it('adds a day to the time, with month overflow', () => {
      expect(add24Hours('2019-07-31T15:00:00.000Z')).to.equal('2019-08-01T15:00:00.000Z')
    })
    it('adds a day to the time, with year overflow', () => {
      expect(add24Hours('2019-12-31T15:00:00.000Z')).to.equal('2020-01-01T15:00:00.000Z')
    })
  });  
});
module.exports = utilsTests
