var expect = require('chai').expect
  , fs = require('fs')
  , ast = require('mkast')
  , Node = ast.Node
  , pi = require('../../cli/pi')
  , utils = require('../util')
  , PassThrough = require('through3').passthrough();

function assert(result) {
  // original document
  expect(result[0].type).to.eql(Node.DOCUMENT);

  // included document
  expect(result[1].type).to.eql(Node.DOCUMENT);

  // included data
  expect(result[2].type).to.eql(Node.PARAGRAPH);

  // eof include document
  expect(result[3].type).to.eql(Node.EOF);

  // eof original document
  expect(result[4].type).to.eql(Node.EOF);
}

describe('pi:', function() {

  it('should process @include directive', function(done) {
    var argv = []
      , target = 'target/mkpi-include.json.log'
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    pi(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var result = utils.result(target);
      assert(result);
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/include.json.log'));
  });

});
