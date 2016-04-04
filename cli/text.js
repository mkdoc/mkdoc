var path = require('path')
  , out = require('mkout')
  , cli = require('mkcli')
  , def = require('../doc/cli/mktext.json')
  , pkg = require('mkout/package.json')
  , prg = cli.load(def);

/**
 *  @name mktext
 *  @cli doc/cli/mktext.md
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
      type: out.TEXT,
      render: {}
    }
    , runtime = {
        base: path.normalize(path.join(__dirname, '..')),
        target: opts.render,
        hints: prg,
        help: {
          file: 'doc/help/mktext.txt',
          output: conf.output
        },
        version: {
          name: 'mktext',
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

    // NOTE: we pass `opts` not `this` as the scope is the `render` object
    out(opts, cb);
  })
}

main.pkg = pkg;

module.exports = main;