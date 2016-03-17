var pi = require('mkpi')
  , parser = require('cli-argparse')
  , usage = require('./usage')
  , version = require('./version')
  , options = {
      '-p, --preserve': 'Do not remove processing instructions.',
      '-h, --help': 'Display this help and exit.',
      '--version': 'Print the version and exit.'
    }
  , hints = {
      options: [],
      flags: [
        '--preserve', '--help'
      ],
      alias: {
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
        input: process.stdin, 
        output: process.stdout
      };

  if(args.flags.help) {
    usage(pkg, options);
    return cb();
  }else if(args.flags.version) {
    version(pkg);
    return cb();
  }

  function done(err) {
    cb(err);
  }

  pi(opts, done);
}

module.exports = cli;
