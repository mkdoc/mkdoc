var fs = require('fs')
  , path = require('path')
  , api = require('mkapi')
  , bin = require('mkcli')
  , def = require('../doc/cli/mkapi.json')
  , pkg = require('mkapi/package.json')
  , prg = bin.load(def, pkg);

/**
 *  @name mkapi
 *  @cli doc/cli/mkapi.md
 */
function main(argv, conf, cb) {

  if(typeof argv === 'function') {
    cb = argv;
    argv = null;
  }

  if(typeof conf === 'function') {
    cb = conf;
    conf = null;
  }

  conf = conf || {};
  conf.output = conf.output || process.stdout;

  var opts = {
      input: process.stdin, 
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
          require('mkcli/plugin/hints'),
          require('mkcli/plugin/argv'),
          require('mkcli/plugin/help'),
          require('mkcli/plugin/version')
        ]
      };

  prg.run(argv, runtime, function parsed(err, req) {
    if(err) {
      return cb(err); 
    }

    if(req.aborted) {
      return cb(err); 
    }

    if(!this.unparsed.length) {
      return cb(new Error('no files specified'));
    }

    if(this.level && !parseInt(this.level)) {
      return cb(new Error('--level must be an integer'));
    }

    this.level = parseInt(this.level);
    this.indent = parseInt(this.indent);

    if(typeof this.output === 'string') {
      this.stream = fs.createWriteStream(this.output); 
    }

    if(this.title !== undefined) {
      this.heading = this.title;
    }

    if(this.private !== undefined) {
      this.conf.include.private = this.private;
    }

    if(this.protected !== undefined) {
      this.conf.include.protected = this.protected;
    }

    api(this.unparsed, this, function(err) {
      if(err) {
        return cb(err); 
      }
      cb(null);
    });
  })
}

main.pkg = pkg;

module.exports = main;
