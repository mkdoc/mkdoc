var expect = require('chai').expect
  , fs = require('fs')
  , ast = require('mkast')
  , Node = ast.Node
  , msg = require('../../cli/msg')
  , utils = require('../util')
  , PassThrough = require('through3').passthrough();

function append(result) {
  expect(result[0].type).to.eql(Node.DOCUMENT);
  expect(result[1].type).to.eql(Node.PARAGRAPH);
  expect(result[2].type).to.eql(Node.DOCUMENT);
  expect(result[2].firstChild.type).to.eql(Node.PARAGRAPH);
  expect(result[2].firstChild.firstChild.literal).to.eql('foo');
  expect(result[3].type).to.eql(Node.EOF);
  expect(result[4].type).to.eql(Node.EOF);
}

function prepend(result) {
  expect(result[0].type).to.eql(Node.DOCUMENT);
  expect(result[1].type).to.eql(Node.DOCUMENT);
  expect(result[1].firstChild.type).to.eql(Node.PARAGRAPH);
  expect(result[1].firstChild.firstChild.literal).to.eql('foo');
  expect(result[2].type).to.eql(Node.EOF);
  expect(result[3].type).to.eql(Node.PARAGRAPH);
  expect(result[4].type).to.eql(Node.EOF);
}

describe('msg:', function() {

  it('should append message to document', function(done) {
    var argv = ['-m', 'foo']
      , target = 'target/mkmsg-append.json.log'
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    msg(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var result = utils.result(target);
      append(result);
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/paragraph.json.log'));
  });

  it('should prepend message to document', function(done) {
    var argv = ['-m', 'foo', '--prepend']
      , target = 'target/mkmsg-prepend.json.log'
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    msg(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var result = utils.result(target);
      prepend(result);
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/paragraph.json.log'));
  });

});
