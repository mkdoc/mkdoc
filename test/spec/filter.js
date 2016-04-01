var expect = require('chai').expect
  , fs = require('fs')
  , ast = require('mkast')
  , Node = ast.Node
  , filter = require('../../cli/filter')
  , utils = require('../util')
  , PassThrough = require('through3').passthrough();

describe('filter:', function() {

  it('should remove heading', function(done) {
    var argv = ['--heading']
      , target = 'target/mkfilter-remove-heading.json.log'
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    filter(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var result = utils.result(target);
      expect(result[0].type).to.eql(Node.DOCUMENT);
      expect(result[1].type).to.eql(Node.PARAGRAPH);
      expect(result[2].type).to.eql(Node.EOF);
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/filter.json.log'));
  });

  it('should remove everything but heading w/ --invert', function(done) {
    var argv = ['--heading', '--document', '--eof', '--invert']
      , target = 'target/mkfilter-remove-heading.json.log'
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    filter(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var result = utils.result(target);
      expect(result[0].type).to.eql(Node.DOCUMENT);
      expect(result[1].type).to.eql(Node.HEADING);
      expect(result[2].type).to.eql(Node.EOF);
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/filter.json.log'));
  });

});
