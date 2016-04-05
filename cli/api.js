var fs = require('fs')
  , path = require('path')
  , api = require('mkapi')
  , cli = require('mkcli')
  , def = require('../doc/cli/mkapi.json')
  , pkg = require('mkapi/package.json')
  , prg = cli.load(def);

/**
 *  @name mkapi
 *  @cli doc/cli/mkapi.md
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

  var opts = {
      output: conf.output,
      conf: {include: {}}
    }
    , runtime = {
        base: path.normalize(path.join(__dirname, '..')),
        target: opts,
        hints: prg,
        help: {
          file: 'doc/help/mkapi.txt',
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

    if(!req.unparsed.length) {
      return cb(new Error('no files specified'));
    }

    if(this.level && !parseInt(this.level)) {
      return cb(new Error('--level must be an integer'));
    }

    this.level = parseInt(this.level);
    this.indent = parseInt(this.indent);

    if(typeof this.output === 'string') {
      this.output = fs.createWriteStream(this.output); 
    }

    if(this.private !== undefined) {
      this.conf.include.private = this.private;
    }

    if(this.protected !== undefined) {
      this.conf.include.protected = this.protected;
    }

    api(req.unparsed, this, cb);
  })
}

main.pkg = pkg;

module.exports = main;
