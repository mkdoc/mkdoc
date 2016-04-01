var expect = require('chai').expect
  , fs = require('fs')
  , cat = require('../../cli/cat')
  , PassThrough = require('through3').passthrough();

describe('cat:', function() {

  it('should print help on no input', function(done) {
    var argv = []
      , target = 'target/mkcat-help-no-input.txt'
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };
    cat(argv, conf, function(err) {
      expect(err).to.eql(null);
      var contents = '' + fs.readFileSync(target)
        , re = new RegExp('^' + cat.pkg.name + ' ');
      expect(re.test(contents)).to.eql(true);
      done();
    })

    // close input stream with no data written
    conf.input.end();
  });
});
