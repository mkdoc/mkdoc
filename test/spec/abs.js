var expect = require('chai').expect
  , fs = require('fs')
  , ast = require('mkast')
  , Node = ast.Node
  , abs = require('../../cli/abs')
  , utils = require('../util')
  , PassThrough = require('through3').passthrough();

function assert(result) {
  expect(result[0].type).to.eql(Node.DOCUMENT);
  expect(result[1].type).to.eql(Node.PARAGRAPH);
  expect(result[1].firstChild.destination)
    .to.eql('http://example.com/EXAMPLE.md');
  expect(result[2].type).to.eql(Node.EOF);
}

describe('abs:', function() {

  it('should read from input stream', function(done) {
    var argv = ['-b', 'http://example.com']
      , target = 'target/mkabs-absolute.json.log'
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    abs(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var result = utils.result(target);
      assert(result);
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/link.json.log'));
  });

});
