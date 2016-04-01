var expect = require('chai').expect
  , fs = require('fs')
  , ast = require('mkast')
  , Node = ast.Node
  , cat = require('../../cli/cat')
  , utils = require('../util')
  , PassThrough = require('through3').passthrough();

function assert(result) {
  expect(result[0].type).to.eql(Node.DOCUMENT);
  expect(result[1].type).to.eql(Node.PARAGRAPH);
  expect(result[2].type).to.eql(Node.EOF);
}

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

  it('should read from input stream', function(done) {
    var argv = []
      , target = 'target/mkcat-input.json.log'
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    cat(argv, conf, function(err) {
      expect(err).to.eql(null);
      var result = utils.result(target);
      assert(result);
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/paragraph.md'));
  });

  it('should read from file argument', function(done) {
    var argv = ['test/fixtures/paragraph.md']
      , target = 'target/mkcat-file-arg.json.log'
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    cat(argv, conf, function(err) {
      expect(err).to.eql(null);
      var result = utils.result(target);
      assert(result);
      done();
    })

    // must end input stream
    conf.input.end();
  });

  it('should callback with error on missing file (ENOENT)', function(done) {
    var argv = ['non-existent.md']
      , target = 'target/mkcat-enoent-error.json.log'
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    cat(argv, conf, function(err) {
      function fn() {
        throw err; 
      }
      expect(fn).throws(/ENOENT/);
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/paragraph.md'));
  });

});
