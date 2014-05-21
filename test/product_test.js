'use strict';

var Product = require('../lib/product.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['Product'] = {
  setUp: function(done) {
    done();
  },
  'new product': function(test) {
    test.expect(2);

    var product = new Product({
      id: 111,
      category: 'widget'
    });

    test.equal(1, 1, 'description');
    test.done();
  },
};