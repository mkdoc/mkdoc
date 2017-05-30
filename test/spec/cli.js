var expect = require('chai').expect
  , fs = require('fs')
  , cli = require('../../cli/cli')
  , PassThrough = require('through3').passthrough();

function assert(result) {
  expect(result.name).to.eql('program');
  expect(result.description).to.eql('Mock program.');
}

describe('cli:', function() {

  it('should create program descriptor', function(done) {
    var argv = []
      , target = 'target/mkcli-descriptor.json.log'
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    cli(argv, conf, function(err) {
      console.dir(err)
      expect(err).to.eql(undefined);
      var result = JSON.parse('' + fs.readFileSync(target));
      assert(result);
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/program.json.log'));
  });

  it('should create program w/ --package', function(done) {
    var argv = ['-p', 'package.json']
      , target = 'target/mkcli-descriptor.json.log'
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    cli(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var result = JSON.parse('' + fs.readFileSync(target));
      assert(result);
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/program.json.log'));
  });

  it('should create program w/ absolute --package', function(done) {
    var argv = ['-p', process.cwd() + '/package.json']
      , target = 'target/mkcli-descriptor.json.log'
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    cli(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      var result = JSON.parse('' + fs.readFileSync(target));
      assert(result);
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/program.json.log'));
  });

  it('should error on missing package descriptor', function(done) {
    var argv = ['-p', 'non-existent.json']
      , target = 'target/mkcli-descriptor.json.log'
      , conf = {
          input: new PassThrough(),
          output: fs.createWriteStream(target)
        };

    cli(argv, conf, function(err) {
      function fn() {
        throw err;
      }
      expect(fn).throws(Error);
      done();
    })

    // write mock data to input stream
    conf.input.end(fs.readFileSync('test/fixtures/program.json.log'));
  });

});
