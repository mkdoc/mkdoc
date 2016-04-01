var expect = require('chai').expect
  , fs = require('fs')
  , ast = require('mkast')
  , Node = ast.Node
  , ref = require('../../cli/ref')
  , utils = require('../util')
  , PassThrough = require('through3').passthrough();

function assert(result) {
  expect(result[0].type).to.eql(Node.DOCUMENT);
  expect(result[1].type).to.eql(Node.PARAGRAPH);
  expect(result[2].type).to.eql(Node.EOF);

  // link reference fragment
  expect(result[3].type).to.eql(Node.DOCUMENT);
  expect(result[4].type).to.eql(Node.PARAGRAPH);
  expect(result[4].firstChild.type).to.eql(Node.LINK);
  expect(result[4].firstChild.destination).to.eql('http://example.com');
  expect(result[5].type).to.eql(Node.EOF);
}

describe('ref:', function() {

  it('should create link references as document fragment', function(done) {
    var argv = []
      , target = 'target/mkref-references.json.log'
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    ref(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var result = utils.result(target);
      assert(result);
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/link-reference.json.log'));
  });

});
