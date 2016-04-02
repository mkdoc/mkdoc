var path = require('path')
  , level = require('mklevel')
  , cli = require('mkcli')
  , def = require('../doc/cli/mklevel.json')
  , pkg = require('mklevel/package.json')
  , prg = cli.load(def);

/**
 *  @name mklevel
 *  @cli doc/cli/mklevel.md
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
      input: conf.input,
      output: conf.output
    }
    , runtime = {
        base: path.normalize(path.join(__dirname, '..')),
        target: opts,
        hints: prg,
        help: {
          file: 'doc/help/mklevel.txt',
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
          require('mkcli/plugin/help'),
          require('mkcli/plugin/version')
        ]
      };

  cli.run(prg, argv, runtime, function parsed(err, req) {
    if(err || req.aborted) {
      return cb(err); 
    }

    var levels = []
      , i
      , num = 6
      , val;

    // propagate all option first
    if(this.all) {
      val = parseInt(this.all) || 0;
    }

    for(i = 0;i < num;i++) {
      // zero fill first
      levels[i] = 0;

      // update with --all when specified
      if(val !== undefined) {
        levels[i] = val;
      }

      // got a specific level flag
      if(this[i + 1] !== undefined) {
        levels[i] = parseInt(this[i + 1]) || 0;
      }
    }

    this.levels = levels;

    level(this, cb);
  })
}

main.pkg = pkg;

module.exports = main;
