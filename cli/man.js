var path = require('path')
  , out = require('mkout')
  , bin = require('mkcli')
  , def = require('../doc/cli/mkout.json')
  , pkg = require('mkout/package.json')
  , prg = bin.load(def, pkg);

/**
 *  @name mkout
 *  @cli doc/cli/mkout.md
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
          require('mkcli/plugin/hints'),
          require('mkcli/plugin/argv'),
          require('mkcli/plugin/help'),
          require('mkcli/plugin/version')
        ]
      };

  prg.run(argv, runtime, function parsed(err, req) {
    if(err || req.aborted) {
      return cb(err); 
    }

    out(opts, cb);
  })
}

main.pkg = pkg;

module.exports = main;
