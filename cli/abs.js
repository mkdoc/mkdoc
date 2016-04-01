var path = require('path')
  , abs = require('mkabs')
  , bin = require('mkcli')
  , def = require('../doc/cli/mkabs.json')
  , pkg = require('mkabs/package.json')
  , prg = bin.load(def, pkg);

/**
 *  @name mkabs
 *  @cli doc/cli/mkabs.md
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
      output: conf.output
    }
    , runtime = {
        base: path.normalize(path.join(__dirname, '..')),
        target: opts,
        hints: prg,
        help: {
          file: 'doc/help/mkabs.txt',
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

    abs(this, cb);
  })
}

module.exports = main;
