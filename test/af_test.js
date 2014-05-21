'use strict';

var AF = require('../af.js');

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

var af, s_code = {};
exports['Analytics Framework'] = {
  setUp: function(done) {
    af = new AF.af(s_code);

    done();
  },
  'set (events)': function(test) {
    test.expect(1);
    // tests here
    af.set('events', 'scOpen');
    test.equal(s_code.events, 'scOpen', 'should set a single event');
    test.done();
  },
};