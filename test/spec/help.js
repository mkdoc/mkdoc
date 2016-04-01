var expect = require('chai').expect
  , fs = require('fs')
  , abs = require('../../cli/abs');

describe('help:', function() {

  it('should print help (abs)', function(done) {
    var argv = ['-h']
      , conf = {
        output: fs.createWriteStream('target/mkabs-help.txt')
      };
    abs(argv, conf, function(err) {
      expect(err).to.eql(null);
      done();
    })
  });

});

