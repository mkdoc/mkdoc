var expect = require('chai').expect
  , fs = require('fs')
  , ast = require('mkast')
  , Node = ast.Node
  , transform = require('../../cli/transform')
  , utils = require('../util')
  , PassThrough = require('through3').passthrough();

function assert(result) {
  expect(result[0].type).to.eql(Node.DOCUMENT);
  expect(result[1].type).to.eql(Node.PARAGRAPH);
  expect(result[2].type).to.eql(Node.EOF);
}

describe('transform:', function() {

  it('should run transform stream', function(done) {
    var argv = ['test/fixtures/transformer.js']
      , target = 'target/mktransform-file.json.log'
      , transformer = require('../fixtures/transformer')
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    transform(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var result = utils.result(target);
      assert(result);

      // check the transform function fired
      expect(transformer.transformed).to.eql(true);
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/paragraph.json.log'));
  });

  it('should run transform stream w/ absolute file path', function(done) {
    var argv = [process.cwd() + '/test/fixtures/transformer.js']
      , target = 'target/mktransform-file-absolute.json.log'
      , transformer = require('../fixtures/transformer')
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    transform(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var result = utils.result(target);
      assert(result);

      // check the transform function fired
      expect(transformer.transformed).to.eql(true);
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/paragraph.json.log'));
  });

  it('should error on missing module', function(done) {
    var argv = ['non-existent.js']
      , target = 'target/mktransform-file-missing.json.log'
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    transform(argv, conf, function(err) {
      function fn() {
        throw err;
      }
      expect(fn).throws(Error);
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/paragraph.json.log'));
  });

  it('should error on bad module export', function(done) {
    var argv = ['test/fixtures/bad-transform-export.js']
      , target = 'target/mktransform-file-export.json.log'
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    transform(argv, conf, function(err) {
      function fn() {
        throw err;
      }
      expect(fn).throws(Error);
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/paragraph.json.log'));
  });

});
