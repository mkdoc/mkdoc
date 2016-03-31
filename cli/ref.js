var ref = require('mkref')
  , bin = require('mkcli')
  , def = require('../doc/cli/mkref.json')
  , pkg = require('mkref/package.json')
  , prg = bin.load(def, pkg);

/**
 *  Resolve link references.
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
        target: opts,
        help: {
          file: 'doc/help/mkref.txt'
        },
        version: pkg,
        plugins: [
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
