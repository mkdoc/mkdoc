var toc = require('mktoc')
  , parser = require('cli-argparse')
  , utils = require('./util')
  , options = {
      '-s, --standalone': 'Create standalone index',
      '-h, --help': 'Display this help and exit',
      '--version': 'Print the version and exit'
    }
  , hints = {
      options: [
      ],
      flags: [
        '--standalone',
        '--help'
      ],
      alias: {
        '-s --standalone': 'standalone',
        '-h --help': 'help'
      }
    }
  , pkg = require('mktoc/package.json');

/**
 *  Resolve link tocerences.
 */
function cli(argv, cb) {

  if(typeof argv === 'function') {
    cb = argv;
    argv = null;
  }

  var args = parser(argv, hints)
    , opts = {
        input: process.stdin, 
        output: process.stdout,
        standalone: args.flags.standalone
      };

  if(args.flags.help) {
    utils.usage(pkg, options);
    return cb();
  }else if(args.flags.version) {
    utils.version(pkg);
    return cb();
  }

  toc(opts, cb);
}

module.exports = cli;
