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

  // NOTE: must be the first test!
  it('should error with no tasks defined', function(done) {
    var argv = ['-f=mkdoc-empty.js']
      , target = '../../target/mk-task-empty.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };

    mk(argv, conf, function(err) {
      function fn() {
        throw err;
      }
      expect(fn).throws(/does not define/i);
      done();
    })
  });

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

  it('should print tasks with parent lookup', function(done) {
    var argv = ['--tasks']
      , target = '../../target/mk-parent-tasks.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };

    process.chdir('empty');

    mk(argv, conf, function(err) {
      expect(err).to.eql(undefined);
      done();
    })
  });

  it('should print tasks with specific files', function(done) {
    var argv = ['--tasks', '-f=mkdoc-require.js']
      , target = '../../target/mk-tasks-file-option.txt'
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

  it('should error with task not found', function(done) {
    var argv = ['non-existent']
      , target = '../../target/mk-tasks.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };

    mk(argv, conf, function(err) {
      function fn() {
        throw err;
      }
      expect(fn).throws(/task not found/i);
      done();
    })
  });

  it('should error with task that throws', function(done) {
    var argv = ['throwable']
      , target = '../../target/mk-task-throws.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };

    mk(argv, conf, function(err) {
      function fn() {
        throw err;
      }
      expect(fn).throws(/mock error/i);
      done();
    })
  });

  it('should error with no mkdoc.js in parents', function(done) {
    var argv = ['--tasks']
      , target = '../../target/mk-parent-tasks.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };

    process.chdir('/sbin');

    mk(argv, conf, function(err) {
      function fn() {
        throw err;
      }
      expect(fn).throws(/no task file/i);
      done();
    })
  });


});
