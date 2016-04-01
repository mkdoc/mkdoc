var expect = require('chai').expect
  , fs = require('fs')
  , abs = require('../../cli/abs');

describe('version:', function() {

  it('should print version (abs)', function(done) {
    var argv = ['--version']
      , conf = {
        output: fs.createWriteStream('target/mkabs-version.txt')
      };
    abs(argv, conf, function(err) {
      expect(err).to.eql(null);
      done();
    })
  });

});

