var cli = require('mkcli')
  , parser = require('cli-argparse')
  , utils = require('./util')
  , options = {
      '-t, --type=[TYPE]': 'Output renderer type',
      '-h, --help': 'Display this help and exit',
      '--version': 'Print the version and exit'
    }
  , hints = {
      options: [
        '-t'
      ],
      flags: [
        '--help'
      ],
      alias: {
        '-t --type': 'type',
        '-h --help': 'help'
      }
    }
  , pkg = require('mkcli/package.json');

/**
 *  Resolve link clierences.
 */
function prg(argv, cb) {

  if(typeof argv === 'function') {
    cb = argv;
    argv = null;
  }

  var args = parser(argv, hints)
    , opts = {
        input: process.stdin, 
        output: process.stdout,
        type: args.options.type || cli.types.JSON
      };

  if(args.flags.help) {
    utils.usage(pkg, options);
    return cb();
  }else if(args.flags.version) {
    utils.version(pkg);
    return cb();
  }

  cli(opts, cb);
}

module.exports = prg;
