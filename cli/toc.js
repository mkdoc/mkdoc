var path = require('path')
  , toc = require('mktoc')
  , cli = require('mkcli')
  , pkg = require('mktoc/package.json')
  , prg = cli.load(require('../doc/json/mktoc.json'));

/**
 *  @name mktoc
 *  @cli doc/cli/mktoc.md
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
          file: 'doc/help/mktoc.txt',
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
          require('mkcli/plugin/version')
        ]
      };

  cli.run(prg, argv, runtime, function parsed(err, req) {
    if(err || req.aborted) {
      return cb(err); 
    }

    var level = parseInt(this.level) || 1
      , depth = parseInt(this.depth) || 1
      , max = parseInt(this.max) || 6;

    if(level < 1) {
      level = 1; 
    }

    if(depth < 1) {
      depth = 1; 
    }

    if(max < 1) {
      max = 1; 
    }

    this.standalone = this.standalone;
    this.title = this.title;
    this.base = this.base;
    this.prefix = this.prefix;
    this.link = !this.disable;
    this.bullet = this.bullet;
    this.delimiter = this.delimiter;
    this.level = level;
    this.depth = depth;
    this.max = max;

    if(this.ordered) {
      this.type = 'ordered'; 
    }

    toc(this, cb);
  })
}

main.pkg = pkg;

module.exports = main;
