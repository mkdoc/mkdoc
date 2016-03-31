var path = require('path')
  , ref = require('mkref')
  , bin = require('mkcli')
  , def = require('../doc/cli/mkref.json')
  , pkg = require('mkref/package.json')
  , prg = bin.load(def, pkg);

/**
 *  @name mkref
 *  @cli doc/cli/mkref.md
 */
function cli(argv, cb) {
  if(typeof argv === 'function') {
    cb = argv;
    argv = null;
  }

  var opts = {
      input: process.stdin, 
      output: process.stdout
    }
    , runtime = {
        base: path.normalize(path.join(__dirname, '..')),
        target: opts,
        hints: prg,
        help: {
          file: 'doc/help/mkref.txt'
        },
        version: pkg,
        plugins: [
          require('mkcli/plugin/hints'),
          require('mkcli/plugin/argv'),
          require('mkcli/plugin/help'),
          require('mkcli/plugin/version')
        ]
      };

  prg.run(argv, runtime, function parsed(err) {
    if(err) {
      return cb(err); 
    }
    ref(opts, cb);
  })
}

module.exports = cli;
