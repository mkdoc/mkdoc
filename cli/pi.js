var pi = require('mkpi')
  , parser = require('cli-argparse')
  , utils = require('./util')
  //, options = {
      //'-s, --safe': 'Disable the @exec and @macro directives',
      //'-p, --preserve': 'Do not remove processing instructions',
      //'-h, --help': 'Display this help and exit',
      //'--version': 'Print the version and exit'
    //}
  , hints = {
      options: [],
      flags: [
        '--safe', '--preserve', '--help'
      ],
      alias: {
        '-s --safe': 'safe',
        '-p --preserve': 'preserve',
        '-h --help': 'help'
      }
    }
  , pkg = require('mkpi/package.json');

/**
 *  Execute processing instructions in the AST written to stdin.
 */
function cli(argv, cb) {

  if(typeof argv === 'function') {
    cb = argv;
    argv = null;
  }

  var args = parser(argv, hints)
    , opts = {
        preserve: args.flags.preserve,
        safe: args.flags.safe,
        input: process.stdin, 
        output: process.stdout
      };

  if(args.flags.help) {
    return cb(null, utils.help('doc/help/mkpi.txt'));
  }else if(args.flags.version) {
    return cb(null, utils.version(pkg));
  }

  pi(opts, cb);
}

module.exports = cli;
