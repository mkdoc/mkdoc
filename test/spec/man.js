var expect = require('chai').expect
  , fs = require('fs')
  , man = require('../../cli/man')
  , PassThrough = require('through3').passthrough();

describe('man:', function() {

  it('should render to troff man page', function(done) {
    var argv = ['-t', 'FOO']
      , target = 'target/mkman-render.json.log'
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    man(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var res = '' + fs.readFileSync(target)
      expect(Boolean(~res.indexOf('FOO'))).to.eql(true);
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/paragraph.json.log'));
  });

});
