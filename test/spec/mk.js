var expect = require('chai').expect
  , fs = require('fs')
  , mk = require('../../cli/mk');

describe('mk:', function() {

  var owd = process.cwd();

  before(function(done) {
    process.chdir('test/fixtures');
    done();
  })

  after(function(done) {
    process.chdir(owd);
    done();
  })

  it('should run task', function(done) {
    var argv = ['readme']
      , conf = {};

    mk(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      done();
    })
  });

  it('should print tasks', function(done) {
    var argv = ['--tasks']
      , target = '../../target/mk-tasks.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };

    mk(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      done();
    })
  });

  it('should error with non-existent file', function(done) {
    var argv = ['-f=non-existent.js']
      , target = '../../target/mk-tasks.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };

    mk(argv, conf, function(err) {
      function fn() {
        throw err;
      }
      expect(fn).throws(/invalid file/i);
      done();
    })
  });

});

