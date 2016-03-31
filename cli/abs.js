var abs = require('mkabs')
  , parser = require('cli-argparse')
  , utils = require('./util')
  , bin = require('mkcli')
  , def = require('../doc/cli/mkabs.json')
  , prg = bin.load(def, pkg)
  , hints = prg.hints()
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
        output: process.stdout,
        greedy: args.flags.greedy
      };

  if(args.options.base) {
    opts.base = args.options.base; 
  }

  if(args.options.relative) {
    opts.rel = args.options.relative;
  }

  if(args.flags.help) {
    return cb(null, utils.help('doc/help/mkabs.txt'));
  }else if(args.flags.version) {
    return cb(null, utils.version(pkg));
  }

  abs(opts, cb);
}

module.exports = cli;
