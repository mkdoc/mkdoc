var path = require('path')
  , cat = require('mkcat')
  , bin = require('mkcli')
  , def = require('../doc/cli/mkcat.json')
  , pkg = require('mkcat/package.json')
  , prg = bin.load(def, pkg);

/**
 *  @name mkcat
 *  @cli doc/cli/mkcat.md
 */
function main(argv, conf, cb) {

  /* istanbul ignore if: always pass argv in test env */
  if(typeof argv === 'function') {
    cb = argv;
    argv = null;
  }

  /* istanbul ignore if: always pass conf in test env */
  if(typeof conf === 'function') {
    cb = conf;
    conf = null;
  }

  /* istanbul ignore next: always pass conf in test env */
  conf = conf || {};
  /* istanbul ignore next: never print to stdout in test env */
  conf.output = conf.output || process.stdout;

  var opts = {
      // read from stdin before files, but be aware that file
      // information is lost so relative includes will not work as expected
      input: process.stdin, 
      output: conf.output,
      serialize: true
    }
    , help = require('mkcli/plugin/help')
    , runtime = {
        base: path.normalize(path.join(__dirname, '..')),
        target: opts,
        hints: prg,
        help: {
          file: 'doc/help/mkcat.txt',
          output: conf.output
        },
        version: {
          name: pkg.name,
          version: pkg.version,
          output: conf.output
        },
        plugins: [
          require('mkcli/plugin/hints'),
          require('mkcli/plugin/argv'),
          help,
          require('mkcli/plugin/version')
        ]
      };

  prg.run(argv, runtime, function parsed(err, req) {
    if(err || req.aborted) {
      return cb(err); 
    }

    this.files = this.unparsed;

    // @todo: fix handling of this option
    if(this.ast === false) {
      this.buffer = true; 
    }

    function done(err, res) {

      if(res && res.once instanceof Function) {
        res.once('error', cb);
        // listen for the end of the write stream
        return res.once('end', done);
      }

      if(opts.buffer && res) {
        opts.output.write('' + res); 
      }

      process.stdin.end();
      cb(err, res);
    }

    var stream = cat(this, done);

    // show help when no files and no input on stdin
    stream.once('stdin', function(size, files) {
      if(!size && !files.length) {
        help.print(runtime.help.file, {runtime: runtime}, cb);
      } 
    })
  })
}

main.pkg = pkg;

module.exports = main;
