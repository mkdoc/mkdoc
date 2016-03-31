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
          file: 'doc/help/mkabs.txt'
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
    abs(opts, cb);
  })
}

module.exports = main;
