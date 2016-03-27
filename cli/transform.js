var transform = require('mktransform')
  , parser = require('cli-argparse')
  , utils = require('./util')
  , options = {
      '-h, --help': 'Display this help and exit',
      '--version': 'Print the version and exit'
    }
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
  , pkg = require('mktransform/package.json');

/**
 *  Add custom stream transformations to the pipeline.
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
    utils.usage(pkg, options);
    return cb();
  }else if(args.flags.version) {
    utils.version(pkg);
    return cb();
  }

  transform(opts, cb);
}

module.exports = cli;
