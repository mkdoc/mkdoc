var abs = require('mkabs')
  , bin = require('mkcli')
  , def = require('../doc/cli/mkabs.json')
  , pkg = require('mkabs/package.json')
  , prg = bin.load(def, pkg);

/**
 *  Make relative links absolute.
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
          file: 'doc/help/mkabs.txt'
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
    abs(opts, cb);
  })
}

module.exports = cli;
