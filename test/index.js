const assert = require('assert');

const util = require('../index');

describe('index.js', () => {
    it('should return object', () => {
        assert.equal(typeof util, 'object');
    });
});
