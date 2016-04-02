var fs = require('fs')
  , path = require('path')
  , out = require('mkout')
  , cli = require('mkcli')
  , def = require('../doc/cli/mkout.json')
  , pkg = require('mkout/package.json')
  , prg = cli.load(def);

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
      render: {}
    }
    , runtime = {
        base: path.normalize(path.join(__dirname, '..')),
        target: opts,
        hints: prg,
        help: {
          file: 'doc/help/mkout.txt',
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

    if(typeof this.output === 'string') {
      this.output = fs.createWriteStream(this.output);
    }

    // support --xml, --html etc.
    for(var k in out.types) {
      if(this.args.flags[k]) {
        this.type = k;
        break;
      } 
    } 

    if(this.noop) {
      this.type = out.NOOP;
    }

    if(this.yamlFull) {
      // implies yaml type, means that -yY is not necessary -Y is enough
      this.type = 'yaml';
      this.render.compact = false; 
    }

    out(this, cb);
  })
}

main.pkg = pkg;

module.exports = main;
