var path = require('path')
  , out = require('mkout')
  , cli = require('mkcli-runtime')
  , pkg = require('mkout/package.json')
  , prg = cli.load(require('../doc/json/mkman.json'));

/**
 *  @name mkman
 *  @cli doc/cli/mkman.md
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
      cli: true,
      type: out.MAN,
      render: {}
    }
    , runtime = {
        base: path.normalize(path.join(__dirname, '..')),
        target: opts.render,
        hints: prg,
        help: {
          file: 'doc/help/mkman.txt',
          output: conf.output
        },
        version: {
          name: 'mkman',
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

    // NOTE: we pass `opts` not `this` as the scope is the `render` object
    out(opts, cb);
  })
}

main.pkg = pkg;

module.exports = main;
