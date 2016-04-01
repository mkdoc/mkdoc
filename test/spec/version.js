var expect = require('chai').expect
  , fs = require('fs')
  , abs = require('../../cli/abs')
  , api = require('../../cli/api')
  , cat = require('../../cli/cat')
  , cli = require('../../cli/cli')

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
});
