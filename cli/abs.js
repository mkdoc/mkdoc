var abs = require('mkabs')
  , parser = require('cli-argparse')
  , utils = require('./util')
  , options = {
      '-b, --base=[URL]': 'Base URL for absolute links',
      '-h, --help': 'Display this help and exit',
      '--version': 'Print the version and exit'
    }
  , hints = {
      options: [
        '-b'
      ],
      flags: [
        '--help'
      ],
      alias: {
        '-b --base': 'base',
        '-h --help': 'help'
      }
    }
  , pkg = require('mkabs/package.json');

/**
 *  Make relative links absolute.
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

  if(args.options.base) {
    opts.base = args.options.base; 
  }

  if(args.flags.help) {
    utils.usage(pkg, options);
    return cb();
  }else if(args.flags.version) {
    utils.version(pkg);
    return cb();
  }

  abs(opts, cb);
}

module.exports = cli;
