var expect = require('chai').expect
  , fs = require('fs')
  , ast = require('mkast')
  , Node = ast.Node
  , out = require('../../cli/out')
  , utils = require('../util')
  , PassThrough = require('through3').passthrough();

function assert(result) {
  expect(result[0].type).to.eql(Node.DOCUMENT);
  expect(result[1].type).to.eql(Node.PARAGRAPH);
  expect(result[2].type).to.eql(Node.EOF);
}

describe('cat:', function() {

  it('should passthrough json with --noop', function(done) {
    var argv = ['-n']
      , target = 'target/mkout-noop.json.log'
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    out(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var result = utils.result(target);
      assert(result);
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/paragraph.json.log'));
  });

  it('should render with default type', function(done) {
    var argv = []
      , target = 'target/mkout-default-type.md'
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    out(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var contents = '' + fs.readFileSync(target);
      expect(contents).to.eql('Paragraph.\n\n');
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/paragraph.json.log'));
  });

  it('should render with --output argument', function(done) {
    var target = 'target/mkout-output-option.md'
      , argv = ['-o=' + target]
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    out(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var contents = '' + fs.readFileSync(target);
      expect(contents).to.eql('Paragraph.\n\n');
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/paragraph.json.log'));
  });

  it('should render with --text argument', function(done) {
    var target = 'target/mkout-text-option.md'
      , argv = ['--text']
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    out(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var contents = '' + fs.readFileSync(target);
      expect(contents).to.eql('Paragraph.\n\n');
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/paragraph.json.log'));
  });
});
