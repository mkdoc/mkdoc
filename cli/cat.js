var path = require('path')
  , cat = require('mkcat')
  , cli = require('mkcli')
  , def = require('../doc/cli/mkcat.json')
  , pkg = require('mkcat/package.json')
  , prg = cli.load(def);

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
  /* istanbul ignore next: never read from stdin in test env */
  conf.input = conf.input || process.stdin;

  var opts = {
      // read from stdin before files, but be aware that file
      // information is lost so relative includes will not work as expected
      input: conf.input, 
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

  cli.run(prg, argv, runtime, function parsed(err, req) {
    if(err || req.aborted) {
      return cb(err); 
    }

    this.files = req.unparsed;

    function done(err, res) {
      process.stdin.end();
      cb(err || null, res);
    }

    var stream = cat(this);

    stream.once('error', function(err) {
      done(err); 
    })

    // show help when no files and no input on stdin
    stream.once('stdin', function(size, files) {
      if(!size && !files.length) {

        // ensure the finish event does not fire before we complete
        // writing the help output
        stream.removeListener('finish', done);

        help.print(
          runtime.help.file,
          {runtime: runtime, conf: runtime.help}, done);
      }
    })

    stream.once('finish', done);
  })
}

main.pkg = pkg;

module.exports = main;
