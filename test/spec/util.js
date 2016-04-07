var expect = require('chai').expect
  , util = require('../../lib/util');

describe('util:', function() {

  it('should ignore with no error', function(done) {
    util.finish();
    done();
  });

  it('should write error message', function(done) {
    var writer = process.stdout.write;
    function intercept(buf) {
      expect(buf).to.eql('ERR | mock error\n');
    }

    process.stdout.write = intercept;
    util.finish(new Error('mock error'));
    process.stdout.write = writer;
    done();
  });

});
