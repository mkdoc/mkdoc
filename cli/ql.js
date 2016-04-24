var path = require('path')
  , ql = require('mkql')
  , cli = require('mkcli')
  , pkg = require('mkql/package.json')
  , prg = cli.load(require('../doc/json/mkql.json'));

/**
 *  @name mkql
 *  @cli doc/cli/mkql.md
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
      query: {
        selectors: []
      }
    }
    , runtime = {
        base: path.normalize(path.join(__dirname, '..')),
        target: opts,
        hints: prg,
        multiple: prg,
        help: {
          file: 'doc/help/mkql.txt',
          output: conf.output
        },
        version: {
          name: 'mkql',
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

    if(!req.unparsed.length) {
      return cb(new Error('no selectors specified'));
    }

    var i
      , unparsed = req.unparsed
      , query;

    if(this.range) {
      this.query = ql.range(unparsed[0], unparsed[1]); 
    }else{
      for(i = 0;i < unparsed.length;i++) {
        try {
          query = ql.compile(unparsed[i]);
          this.query.selectors = 
            this.query.selectors.concat(query.selectors);
        }catch(e) {
          return cb(e); 
        }
      }
    }

    ql(this, cb);
  })
}

main.pkg = pkg;

module.exports = main;
