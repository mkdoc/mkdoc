var expect = require('chai').expect
  , fs = require('fs')
  , abs = require('../../cli/abs')
  , api = require('../../cli/api')
  , cat = require('../../cli/cat')
  , cli = require('../../cli/cli')
  , filter = require('../../cli/filter')
  , level = require('../../cli/level')

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
        , re = new RegExp('^' + abs.pkg.name + ' ');
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
        , re = new RegExp('^' + api.pkg.name + ' ');
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
        , re = new RegExp('^' + cat.pkg.name + ' ');
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
        , re = new RegExp('^' + cli.pkg.name + ' ');
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
        , re = new RegExp('^' + filter.pkg.name + ' ');
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
        , re = new RegExp('^' + level.pkg.name + ' ');
      expect(re.test(contents)).to.eql(true);
      done();
    })
  });

});
