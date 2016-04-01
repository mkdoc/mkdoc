var expect = require('chai').expect
  , fs = require('fs')
  , abs = require('../../cli/abs');

describe('version:', function() {

  it('should print version (abs)', function(done) {
    var argv = ['--version']
      , target = 'target/mkabs-version.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };

    abs(argv, conf, function(err) {
      expect(err).to.eql(null);
      var contents = '' + fs.readFileSync(target);
      expect(contents).to.eql(abs.pkg.name + ' ' + abs.pkg.version + '\n');
      done();
    })

  });

});

