var expect = require('chai').expect
  , fs = require('fs')
  , parse = require('../../cli/parse');

describe('parse:', function() {

  it('should error with no files specified', function(done) {
    var argv = []
      , target = 'target/mkparse-no-files.js'
      , conf = {
          output: fs.createWriteStream(target)
        };

    parse(argv, conf, function(err) {
      function fn() {
        throw err;
      }
      expect(fn).throws(/no files specified/i)
      done();
    })
  });

  it('should error with bad language pack', function(done) {
    var argv = ['test/fixtures/parse.js', '-l=foo']
      , target = 'target/mkparse-bad-lang.js'
      , conf = {
          output: fs.createWriteStream(target)
        };

    parse(argv, conf, function(err) {
      function fn() {
        throw err;
      }
      expect(fn).throws(/unknown language pack/i)
      done();
    })
  });

  it('should skip file with no extension and no --lang', function(done) {
    var argv = ['test/fixtures/parse-no-extension']
      , target = 'target/mkparse-no-extension.js'
      , conf = {
          output: fs.createWriteStream(target)
        };

    parse(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var res = '' + fs.readFileSync(target);
      expect(res).to.eql('');
      done();
    })
  });

  it('should write comments in default mode', function(done) {
    var argv = ['test/fixtures/parse.js']
      , target = 'target/mkparse-default.js'
      , conf = {
          output: fs.createWriteStream(target)
        };

    parse(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var res = '' + fs.readFileSync(target);
      expect(Boolean(~res.indexOf('@name parse.js'))).to.eql(true);
      done();
    })
  });

  it('should remove comments with --strip', function(done) {
    var argv = ['test/fixtures/parse.js', '--strip']
      , target = 'target/mkparse-strip.js'
      , conf = {
          output: fs.createWriteStream(target)
        };

    parse(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var res = '' + fs.readFileSync(target);
      expect(res.trim()).to.eql('');
      done();
    })
  });

  it('should load language pack with --lang', function(done) {
    var argv = ['test/fixtures/parse.js', '-l=javascript']
      , target = 'target/mkparse-lang.js'
      , conf = {
          output: fs.createWriteStream(target)
        };

    parse(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var res = '' + fs.readFileSync(target);
      expect(Boolean(~res.indexOf('@name parse.js'))).to.eql(true);
      done();
    })
  });

  it('should write comments as JSON with --json', function(done) {
    var argv = ['test/fixtures/parse.js', '-j']
      , target = 'target/mkparse-default.js'
      , conf = {
          output: fs.createWriteStream(target)
        };

    parse(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      // NOTE: safe to parse as there is only one comment in the test fixture
      var res = JSON.parse('' + fs.readFileSync(target));
      expect(res.tags[0].id).to.eql('name');
      expect(res.tags[0].name).to.eql('parse.js');
      done();
    })
  });

  it('should write comments as JSON with --json and --content', function(done) {
    var argv = ['test/fixtures/parse.js', '-j', '--content']
      , target = 'target/mkparse-mixed-json.js'
      , conf = {
          output: fs.createWriteStream(target)
        };

    parse(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      done();
    })
  });

});
