var expect = require('chai').expect
  , fs = require('fs')
  , ast = require('mkast')
  , Node = ast.Node
  , toc = require('../../cli/toc')
  , utils = require('../util')
  , PassThrough = require('through3').passthrough();

function assert(result, type) {
  expect(result[0].type).to.eql(Node.DOCUMENT);
  expect(result[1].type).to.eql(Node.HEADING);
  expect(result[2].type).to.eql(Node.HEADING);
  expect(result[3].type).to.eql(Node.EOF);
  expect(result[4].type).to.eql(Node.DOCUMENT);
  expect(result[5].type).to.eql(Node.LIST);
  expect(result[5].listData.type).to.eql(type);
  expect(result[6].type).to.eql(Node.EOF);
}

describe('toc:', function() {

  it('should create document fragment with no arguments', function(done) {
    var argv = []
      , target = 'target/mktoc-bullet.json.log'
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    toc(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var result = utils.result(target);
      assert(result, 'bullet');
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/heading.json.log'));
  });

  it('should create ordered list with --ordered', function(done) {
    var argv = ['-o']
      , target = 'target/mktoc-ordered.json.log'
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    toc(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var result = utils.result(target);
      assert(result, 'ordered');
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/heading.json.log'));
  });

  it('should create standalone list', function(done) {
    var argv = ['--standalone']
      , target = 'target/mktoc-standalone.json.log'
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    toc(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var result = utils.result(target);
      expect(result[0].type).to.eql(Node.DOCUMENT);
      expect(result[1].type).to.eql(Node.LIST);
      expect(result[2].type).to.eql(Node.EOF);
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/heading.json.log'));
  });

  it('should create standalone list w/ --title', function(done) {
    var argv = ['--standalone', '--title=FOO', '--level=2']
      , target = 'target/mktoc-standalone.json.log'
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    toc(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var result = utils.result(target);
      expect(result[0].type).to.eql(Node.DOCUMENT);
      expect(result[1].type).to.eql(Node.HEADING);
      expect(result[1].level).to.eql(2);
      expect(result[2].type).to.eql(Node.LIST);
      expect(result[3].type).to.eql(Node.EOF);
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/heading.json.log'));
  });

  it('should handle negative --depth', function(done) {
    var argv = ['--standalone', '--depth=-1']
      , target = 'target/mktoc-standalone.json.log'
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    toc(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var result = utils.result(target);
      expect(result[0].type).to.eql(Node.DOCUMENT);
      expect(result[1].type).to.eql(Node.LIST);
      expect(result[2].type).to.eql(Node.EOF);
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/heading.json.log'));
  });

  it('should handle negative --max', function(done) {
    var argv = ['--standalone', '--max=-1']
      , target = 'target/mktoc-standalone.json.log'
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    toc(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var result = utils.result(target);
      expect(result[0].type).to.eql(Node.DOCUMENT);
      expect(result[1].type).to.eql(Node.LIST);
      expect(result[2].type).to.eql(Node.EOF);
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/heading.json.log'));
  });

  it('should handle negative heading level', function(done) {
    var argv = ['--standalone', '--title=FOO', '--level=-1']
      , target = 'target/mktoc-standalone.json.log'
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    toc(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var result = utils.result(target);
      expect(result[0].type).to.eql(Node.DOCUMENT);
      expect(result[1].type).to.eql(Node.HEADING);
      expect(result[1].level).to.eql(1);
      expect(result[2].type).to.eql(Node.LIST);
      expect(result[3].type).to.eql(Node.EOF);
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/heading.json.log'));
  });

});
