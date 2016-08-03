var path = require('path')
  , transform = require('mktransform')
  , highlight = require('mkhighlight')
  , collect = require('../lib/collect')
  , cli = require('mkcli-runtime')
  , pkg = require('mkhighlight/package.json')
  , prg = cli.load(require('../doc/json/mkhigh.json'));

/**
 *  @name mkhigh
 *  @cli doc/cli/mkhigh.md
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
      output: conf.output,
      transforms: [highlight]
    }
    , runtime = {
        base: path.normalize(path.join(__dirname, '..')),
        target: opts,
        argv: {
          camelcase: false 
        },
        hints: prg,
        help: {
          file: 'doc/help/mkhigh.txt',
          output: conf.output
        },
        version: {
          name: pkg.name,
          version: pkg.version,
          output: conf.output
        },
        plugins: [
          require('mkcli-runtime/plugin/epipe'),
          require('mkcli-runtime/plugin/hints'),
          require('mkcli-runtime/plugin/argv'),
          require('mkcli-runtime/plugin/help'),
          require('mkcli-runtime/plugin/version')
        ]
      };

  cli.run(prg, argv, runtime, function parsed(err, req) {
    if(err || req.aborted) {
      return cb(err); 
    }

    this.alias = collect('alias', this);

    // transform can throw on bad export
    try {
      transform(this, cb);
    }catch(e) {
      return cb(e); 
    }

  })
}

main.pkg = pkg;

module.exports = main;
