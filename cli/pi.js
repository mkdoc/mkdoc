var pi = require('mkpi')
  , parser = require('cli-argparse')
  , usage = require('./usage')
  , version = require('./version')
  , options = {
      '-h, --help': 'Display this help and exit.',
      '--version': 'Print the version and exit.'
    }
  , hints = {
      options: [
      ],
      flags: [
        //'--ast'
      ],
      alias: {
        //'-a --ast': 'ast'
      }
    }
  , pkg = require('mkcat/package.json');

/**
 *  Execute processing instructions in the AST written to stdin.
 */
function cli(argv, cb) {

  if(typeof argv === 'function') {
    cb = argv;
    argv = null;
  }

  var args = parser(argv, hints)
    , opts = {};

  if(args.flags.h || args.flags.help) {
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
