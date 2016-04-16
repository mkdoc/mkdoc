var path = require('path')
  , page = require('mkpage')
  , cli = require('mkcli')
  , pkg = require('mkpage/package.json')
  , prg = cli.load(require('../doc/json/mkpage.json'));

function collect(id, scope) {
  var map = {}
    , k
    , match = new RegExp('^' + id + '-')
    , key;

  for(k in scope) {
    if(match.test(k)) {
      key = k.replace(match, '');
      map[key]  = scope[k];
    } 
  }

  return map;
}

/**
 *  @name mkpage
 *  @cli doc/cli/mkpage.md
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
        argv: {
          camelcase: false
        },
        multiple: prg,
        help: {
          file: 'doc/help/mkpage.txt',
          output: conf.output
        },
        version: {
          name: pkg.name,
          version: pkg.version,
          output: conf.output
        },
        plugins: [
          require('mkcli/plugin/epipe'),
          require('mkcli/plugin/hints'),
          require('mkcli/plugin/argv'),
          require('mkcli/plugin/help'),
          require('mkcli/plugin/version'),
          require('mkcli/plugin/multiple')
        ]
      };

  cli.run(prg, argv, runtime, function parsed(err, req) {
    if(err || req.aborted) {
      return cb(err); 
    }

    // collect prefixed options into object maps
    this.html = collect('html', this);
    this.meta = collect('meta', this);
    this.body = collect('body', this);
    this.attr = collect('attr', this);

    page(this, cb);
  })
}

main.pkg = pkg;

module.exports = main;
