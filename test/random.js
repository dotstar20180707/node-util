const assert = require('assert');

const util = require('../index');

const random = util.random;

describe('util.random', () => {
    it('should return object', () => {
        assert.equal(typeof random, 'object');
    });

    it('string() should return random string', () => {
        assert.equal(typeof random.string(8), 'string');
        assert.equal(random.string(8).length, 8);
        assert(/[a-zA-Z0-9]*/.test(random.string(8)));
        assert(/[a-c]*/.test(random.string(8, 'abc')));
    });

    it('integer() should return random integer', () => {
        assert.equal(typeof random.integer(), 'number');
        assert(/[0-9]*/.test(random.integer()));
        for(let n = 0; n < 10000; n++) {
            const randomInteger = random.integer(0, 10);
            assert(randomInteger >= 0);
            assert(randomInteger < 10);
        }
    });

    it('boolean() should return random boolean', () => {
        assert.equal(typeof random.boolean(), 'boolean');
        let isTrueReturned = false;
        let isFalseReturned = false;
        for (let n = 0; n < 10000; n++) {
            const randomBoolean = random.boolean();
            randomBoolean ? isTrueReturned = true : isFalseReturned = true;
            if (isTrueReturned && isFalseReturned) {
                break;
            }
        }
        assert(isTrueReturned, 'true is not returned');
        assert(isFalseReturned, 'false is not returned');
    });

    it('element() should return random element from array', () => {
        const array = [0, 1, 2, 3, 4, 5];
        const returned = new Set();
        for(let n = 0; n < 10000; n++) {
            const randomElement = random.element(array);
            assert(array.includes(randomElement));
            returned.add(randomElement);
        }

        assert.equal(array.length, returned.size);
    });

    it('elements should return random elements from array', () => {
        const array = [0, 1, 2, 3, 4, 5];
        const returned = new Set();
        for(let n = 0; n < 10000; n++) {
            const randomElements = random.elements(array, 3);
            assert(Array.isArray(randomElements));
            assert(randomElements.length, 3);
            randomElements.forEach(e => {
                assert(array.includes(e));
                returned.add(e);
            })
        }

        assert.equal(array.length, returned.size);

    });
});
