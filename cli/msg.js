var msg = require('mkmsg')
  , parser = require('cli-argparse')
  , utils = require('./util')
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
    return cb(null, utils.help('doc/help/mkmsg.txt'));
  }else if(args.flags.version) {
    return cb(null, utils.version(pkg));
  }

  msg(opts, cb);
}

module.exports = cli;
