var expect = require('chai').expect
  , fs = require('fs')
  , api = require('../../cli/api');

describe('api:', function() {

  it('should error with no files specified', function(done) {
    var argv = []
      , target = 'target/mkapi-no-files.json.log'
      , conf = {
          output: fs.createWriteStream(target)
        };

    api(argv, conf, function(err) {
      function fn() {
        throw err;
      }
      expect(fn).throws(/no files specified/i);
      done();
    })
  });

  it('should error with bad level', function(done) {
    var argv = ['test/fixtures/api.js', '--level=foo']
      , target = 'target/mkapi-bad-level.json.log'
      , conf = {
          output: fs.createWriteStream(target)
        };

    api(argv, conf, function(err) {
      function fn() {
        throw err;
      }
      expect(fn).throws(/level must be an integer/i);
      done();
    })
  });

  it('should create api docs', function(done) {
    var argv = ['test/fixtures/api.js']
      , target = 'target/mkapi-docs.json.log'
      , conf = {
          output: fs.createWriteStream(target)
        };

    api(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var result = '' + fs.readFileSync(target);
      expect(Boolean(~result.indexOf('## api.js'))).to.eql(true);
      done();
    })
  });

  it('should create api docs w/ --output option', function(done) {
    var target = 'target/mkapi-output-option.json.log'
      , argv = ['test/fixtures/api.js', '-o=' + target]
      , conf = {};

    api(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var result = '' + fs.readFileSync(target);
      expect(Boolean(~result.indexOf('## api.js'))).to.eql(true);
      done();
    })
  });

  it('should create api docs w/ --private option', function(done) {
    var target = 'target/mkapi-private-option.json.log'
      , argv = ['test/fixtures/api.js', '--private']
      , conf = {
          output: fs.createWriteStream(target)
        };

    api(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var result = '' + fs.readFileSync(target);
      expect(Boolean(~result.indexOf('## api.js'))).to.eql(true);
      done();
    })
  });

  it('should create api docs w/ --protected option', function(done) {
    var target = 'target/mkapi-protected-option.json.log'
      , argv = ['test/fixtures/api.js', '--protected']
      , conf = {
          output: fs.createWriteStream(target)
        };

    api(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var result = '' + fs.readFileSync(target);
      expect(Boolean(~result.indexOf('## api.js'))).to.eql(true);
      done();
    })
  });

});
