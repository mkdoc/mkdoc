var expect = require('chai').expect
  , fs = require('fs')
  , ast = require('mkast')
  , Node = ast.Node
  , level = require('../../cli/level')
  , utils = require('../util')
  , PassThrough = require('through3').passthrough();

function assert(result, one, two) {
  expect(result[0].type).to.eql(Node.DOCUMENT);
  expect(result[1].type).to.eql(Node.HEADING);
  expect(result[1].level).to.eql(one);
  expect(result[2].type).to.eql(Node.HEADING);
  expect(result[2].level).to.eql(two);
  expect(result[3].type).to.eql(Node.EOF);
}

describe('level:', function() {

  it('should indent heading level', function(done) {
    var argv = ['-1=1']
      , target = 'target/mklevel-indent.json.log'
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    level(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var result = utils.result(target);
      assert(result, 2, 2);
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/heading.json.log'));
  });

  it('should ignore bad -1 option', function(done) {
    var argv = ['-1=foo']
      , target = 'target/mklevel-indent.json.log'
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    level(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var result = utils.result(target);
      assert(result, 1, 2);
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/heading.json.log'));
  });

  it('should indent all heading levels', function(done) {
    var argv = ['-a=1']
      , target = 'target/mklevel-indent.json.log'
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    level(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var result = utils.result(target);
      assert(result, 2, 3);
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/heading.json.log'));
  });

  it('should ignore bad --all option', function(done) {
    var argv = ['--all=foo']
      , target = 'target/mklevel-indent.json.log'
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    level(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var result = utils.result(target);
      assert(result, 1, 2);
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/heading.json.log'));
  });

});
