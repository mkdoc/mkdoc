var gen = require('mkgen')
  , parser = require('cli-argparse')
  , usage = require('./usage')
  , version = require('./version')
  , options = {
      '-m, --message=[MSG]': 'Custom message, parsed as markdown.',
      '-p, --prepend': 'Prepend message to the stream.',
      '-h, --help': 'Display this help and exit.',
      '--version': 'Print the version and exit.'
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
  , pkg = require('mkgen/package.json');

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
        prepend: args.flags.prepend,
        input: process.stdin, 
        output: process.stdout
      };

  if(args.options.message) {
    opts.message = args.options.message; 
  }

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

  gen(opts, done);
}

module.exports = cli;
