var expect = require('chai').expect
  , fs = require('fs')
  , abs = require('../../cli/abs')
  , api = require('../../cli/api')
  , cat = require('../../cli/cat')
  , cli = require('../../cli/cli')
  , filter = require('../../cli/filter')
  , level = require('../../cli/level')
  , mk = require('../../cli/mk')
  , msg = require('../../cli/msg')
  , out = require('../../cli/out')
  , parse = require('../../cli/parse')
  , pi = require('../../cli/pi')
  , ref = require('../../cli/ref')

describe('version:', function() {

  it('should print version (abs)', function(done) {
    var argv = ['--version']
      , target = 'target/mkabs-version.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };

    abs(argv, conf, function(err) {
      expect(err).to.eql(null);
      var contents = '' + fs.readFileSync(target);
      expect(contents).to.eql(abs.pkg.name + ' ' + abs.pkg.version + '\n');
      done();
    })
  });

  it('should print version (api)', function(done) {
    var argv = ['--version']
      , target = 'target/mkapi-version.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };

    api(argv, conf, function(err) {
      expect(err).to.eql(null);
      var contents = '' + fs.readFileSync(target);
      expect(contents).to.eql(api.pkg.name + ' ' + api.pkg.version + '\n');
      done();
    })
  });

  it('should print version (cat)', function(done) {
    var argv = ['--version']
      , target = 'target/mkcat-version.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };

    cat(argv, conf, function(err) {
      expect(err).to.eql(null);
      var contents = '' + fs.readFileSync(target);
      expect(contents).to.eql(cat.pkg.name + ' ' + cat.pkg.version + '\n');
      done();
    })
  });

  it('should print version (cli)', function(done) {
    var argv = ['--version']
      , target = 'target/mkcli-version.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };

    cli(argv, conf, function(err) {
      expect(err).to.eql(null);
      var contents = '' + fs.readFileSync(target);
      expect(contents).to.eql(cli.pkg.name + ' ' + cli.pkg.version + '\n');
      done();
    })
  });

  it('should print version (filter)', function(done) {
    var argv = ['--version']
      , target = 'target/mkfilter-version.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };

    filter(argv, conf, function(err) {
      expect(err).to.eql(null);
      var contents = '' + fs.readFileSync(target);
      expect(contents).to.eql(
        filter.pkg.name + ' ' + filter.pkg.version + '\n');
      done();
    })
  });

  it('should print version (level)', function(done) {
    var argv = ['--version']
      , target = 'target/mklevel-version.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };

    level(argv, conf, function(err) {
      expect(err).to.eql(null);
      var contents = '' + fs.readFileSync(target);
      expect(contents).to.eql(
        level.pkg.name + ' ' + level.pkg.version + '\n');
      done();
    })
  });

  it('should print version (mk)', function(done) {
    var argv = ['--version']
      , target = 'target/mk-version.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };

    mk(argv, conf, function(err) {
      expect(err).to.eql(null);
      var contents = '' + fs.readFileSync(target);
      expect(contents).to.eql(
        mk.pkg.name.replace('task', '') + ' ' + mk.pkg.version + '\n');
      done();
    })
  });

  it('should print version (msg)', function(done) {
    var argv = ['--version']
      , target = 'target/mkmsg-version.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };

    msg(argv, conf, function(err) {
      expect(err).to.eql(null);
      var contents = '' + fs.readFileSync(target);
      expect(contents).to.eql(msg.pkg.name + ' ' + msg.pkg.version + '\n');
      done();
    })
  });

  it('should print version (out)', function(done) {
    var argv = ['--version']
      , target = 'target/mkout-version.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };

    out(argv, conf, function(err) {
      expect(err).to.eql(null);
      var contents = '' + fs.readFileSync(target);
      expect(contents).to.eql(out.pkg.name + ' ' + out.pkg.version + '\n');
      done();
    })
  });

  it('should print version (parse)', function(done) {
    var argv = ['--version']
      , target = 'target/mkparse-version.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };

    parse(argv, conf, function(err) {
      expect(err).to.eql(null);
      var contents = '' + fs.readFileSync(target);
      expect(contents).to.eql(
        parse.pkg.name + ' ' + parse.pkg.version + '\n');
      done();
    })
  });

  it('should print version (pi)', function(done) {
    var argv = ['--version']
      , target = 'target/mkpi-version.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };

    pi(argv, conf, function(err) {
      expect(err).to.eql(null);
      var contents = '' + fs.readFileSync(target);
      expect(contents).to.eql(pi.pkg.name + ' ' + pi.pkg.version + '\n');
      done();
    })
  });

  it('should print version (ref)', function(done) {
    var argv = ['--version']
      , target = 'target/mkref-version.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };

    ref(argv, conf, function(err) {
      expect(err).to.eql(null);
      var contents = '' + fs.readFileSync(target);
      expect(contents).to.eql(ref.pkg.name + ' ' + ref.pkg.version + '\n');
      done();
    })
  });

});
