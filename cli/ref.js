var ref = require('mkref')
  , parser = require('cli-argparse')
  , utils = require('./util')
  , hints = {
      options: [
      ],
      flags: [
        '--help'
      ],
      alias: {
        '-h --help': 'help'
      }
    }
  , pkg = require('mkref/package.json');

/**
 *  Resolve link references.
 */
function cli(argv, cb) {

  if(typeof argv === 'function') {
    cb = argv;
    argv = null;
  }

  var args = parser(argv, hints)
    , opts = {
        input: process.stdin, 
        output: process.stdout
      };

  if(args.flags.help) {
    return cb(null, utils.help('doc/help/mkref.txt'));
  }else if(args.flags.version) {
    return cb(null, utils.version(pkg));
  }

  ref(opts, cb);
}

module.exports = cli;
