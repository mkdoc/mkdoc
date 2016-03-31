var path = require('path')
  , pi = require('mkpi')
  , bin = require('mkcli')
  , def = require('../doc/cli/mkpi.json')
  , pkg = require('mkpi/package.json')
  , prg = bin.load(def, pkg);

/**
 *  @name mkpi
 *  @cli doc/cli/mkpi.md
 */
function main(argv, cb) {

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
          file: 'doc/help/mkpi.txt'
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
    pi(this, cb);
  })
}

module.exports = main;
