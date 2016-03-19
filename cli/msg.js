var msg = require('mkmsg')
  , parser = require('cli-argparse')
  , utils = require('./util')
  , options = {
      '-m, --message=[MSG]': 'Custom message, parsed as markdown',
      '-p, --prepend': 'Prepend message to the stream',
      '-h, --help': 'Display this help and exit',
      '--version': 'Print the version and exit'
    }
  , hints = {
      options: [
        '-m'
      ],
      flags: [
        '--prepend', '--help'
      ],
      alias: {
        '-m --message': 'message',
        '-p --prepend': 'prepend',
        '-h --help': 'help'
      }
    }
  , pkg = require('mkmsg/package.json');

/**
 *  Append or prepend a message to the stream.
 */
function cli(argv, cb) {

  if(typeof argv === 'function') {
    cb = argv;
    argv = null;
  }

  var args = parser(argv, hints)
    , opts = {
        prepend: args.flags.prepend,
        input: process.stdin, 
        output: process.stdout
      };

  if(args.options.message) {
    opts.message = args.options.message; 
  }

  if(args.flags.help) {
    utils.usage(pkg, options);
    return cb();
  }else if(args.flags.version) {
    utils.version(pkg);
    return cb();
  }

  msg(opts, cb);
}

module.exports = cli;
