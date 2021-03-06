var expect = require('chai').expect
  , fs = require('fs')
  , abs = require('../../cli/abs')
  , api = require('../../cli/api')
  , cat = require('../../cli/cat')
  , cli = require('../../cli/cli')
  , filter = require('../../cli/filter')
  , level = require('../../cli/level')
  , man = require('../../cli/man')
  , mk = require('../../cli/mk')
  , msg = require('../../cli/msg')
  , out = require('../../cli/out')
  , parse = require('../../cli/parse')
  , pi = require('../../cli/pi')
  , ref = require('../../cli/ref')
  , toc = require('../../cli/toc')
  , transform = require('../../cli/transform')

describe('help:', function() {

  it('should print help (abs)', function(done) {
    var argv = ['-h']
      , target = 'target/mkabs-help.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };
    abs(argv, conf, function(err) {
      expect(err).to.eql(null);
      var contents = '' + fs.readFileSync(target)
        , re = new RegExp('^Usage: ' + abs.pkg.name);
      expect(re.test(contents)).to.eql(true);
      done();
    })
  });

  it('should print help (api)', function(done) {
    var argv = ['-h']
      , target = 'target/mkapi-help.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };
    api(argv, conf, function(err) {
      expect(err).to.eql(null);
      var contents = '' + fs.readFileSync(target)
        , re = new RegExp('^Usage: ' + api.pkg.name);
      expect(re.test(contents)).to.eql(true);
      done();
    })
  });

  it('should print help (cat)', function(done) {
    var argv = ['-h']
      , target = 'target/mkcat-help.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };
    cat(argv, conf, function(err) {
      expect(err).to.eql(null);
      var contents = '' + fs.readFileSync(target)
        , re = new RegExp('^Usage: ' + cat.pkg.name);
      expect(re.test(contents)).to.eql(true);
      done();
    })
  });

  it('should print help (cli)', function(done) {
    var argv = ['-h']
      , target = 'target/mkcli-help.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };
    cli(argv, conf, function(err) {
      expect(err).to.eql(null);
      var contents = '' + fs.readFileSync(target)
        , re = new RegExp('^Usage: ' + cli.pkg.name);
      expect(re.test(contents)).to.eql(true);
      done();
    })
  });

  it('should print help (filter)', function(done) {
    var argv = ['-h']
      , target = 'target/mkfilter-help.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };
    filter(argv, conf, function(err) {
      expect(err).to.eql(null);
      var contents = '' + fs.readFileSync(target)
        , re = new RegExp('^Usage: ' + filter.pkg.name);
      expect(re.test(contents)).to.eql(true);
      done();
    })
  });

  it('should print help (level)', function(done) {
    var argv = ['-h']
      , target = 'target/mklevel-help.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };
    level(argv, conf, function(err) {
      expect(err).to.eql(null);
      var contents = '' + fs.readFileSync(target)
        , re = new RegExp('^Usage: ' + level.pkg.name);
      expect(re.test(contents)).to.eql(true);
      done();
    })
  });

  it('should print help (man)', function(done) {
    var argv = ['-h']
      , target = 'target/mkman-help.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };
    man(argv, conf, function(err) {
      expect(err).to.eql(null);
      var contents = '' + fs.readFileSync(target)
        , re = new RegExp('^Usage: mkman');
      expect(re.test(contents)).to.eql(true);
      done();
    })
  });

  it('should print help (mk)', function(done) {
    var argv = ['-h']
      , target = 'target/mk-help.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };
    mk(argv, conf, function(err) {
      expect(err).to.eql(null);
      var contents = '' + fs.readFileSync(target)
        , re = new RegExp('^Usage: ' + mk.pkg.name.replace('task', ''));
      expect(re.test(contents)).to.eql(true);
      done();
    })
  });

  it('should print help (msg)', function(done) {
    var argv = ['-h']
      , target = 'target/mkmsg-help.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };
    msg(argv, conf, function(err) {
      expect(err).to.eql(null);
      var contents = '' + fs.readFileSync(target)
        , re = new RegExp('^Usage: ' + msg.pkg.name);
      expect(re.test(contents)).to.eql(true);
      done();
    })
  });

  it('should print help (out)', function(done) {
    var argv = ['-h']
      , target = 'target/mkout-help.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };
    out(argv, conf, function(err) {
      expect(err).to.eql(null);
      var contents = '' + fs.readFileSync(target)
        , re = new RegExp('^Usage: ' + out.pkg.name);
      expect(re.test(contents)).to.eql(true);
      done();
    })
  });

  it('should print help (parse)', function(done) {
    var argv = ['-h']
      , target = 'target/mkparse-help.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };
    parse(argv, conf, function(err) {
      expect(err).to.eql(null);
      var contents = '' + fs.readFileSync(target)
        , re = new RegExp('^Usage: ' + parse.pkg.name);
      expect(re.test(contents)).to.eql(true);
      done();
    })
  });

  it('should print help (pi)', function(done) {
    var argv = ['-h']
      , target = 'target/mkpi-help.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };
    pi(argv, conf, function(err) {
      expect(err).to.eql(null);
      var contents = '' + fs.readFileSync(target)
        , re = new RegExp('^Usage: ' + pi.pkg.name);
      expect(re.test(contents)).to.eql(true);
      done();
    })
  });

  it('should print help (ref)', function(done) {
    var argv = ['-h']
      , target = 'target/mkref-help.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };
    ref(argv, conf, function(err) {
      expect(err).to.eql(null);
      var contents = '' + fs.readFileSync(target)
        , re = new RegExp('^Usage: ' + ref.pkg.name);
      expect(re.test(contents)).to.eql(true);
      done();
    })
  });

  it('should print help (toc)', function(done) {
    var argv = ['-h']
      , target = 'target/mktoc-help.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };
    toc(argv, conf, function(err) {
      expect(err).to.eql(null);
      var contents = '' + fs.readFileSync(target)
        , re = new RegExp('^Usage: ' + toc.pkg.name);
      expect(re.test(contents)).to.eql(true);
      done();
    })
  });

  it('should print help (transform)', function(done) {
    var argv = ['-h']
      , target = 'target/mktransform-help.txt'
      , conf = {
          output: fs.createWriteStream(target)
        };
    transform(argv, conf, function(err) {
      expect(err).to.eql(null);
      var contents = '' + fs.readFileSync(target)
        , re = new RegExp('^Usage: ' + transform.pkg.name);
      expect(re.test(contents)).to.eql(true);
      done();
    })
  });

});
