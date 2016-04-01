var expect = require('chai').expect
  , fs = require('fs')
  , abs = require('../../cli/abs');

describe('help:', function() {

  it('should print help (abs)', function(done) {
    var argv = ['-h']
      , target = 'target/mkabs-help.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };
    abs(argv, conf, function(err) {
      expect(err).to.eql(null);
      var contents = '' + fs.readFileSync(target)
        , re = new RegExp('^' + abs.pkg.name + ' ');
      expect(re.test(contents)).to.eql(true);
      done();
    })
  });

});

