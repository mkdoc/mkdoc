var path = require('path')
  , cli = require('mkcli')
  , parser = require('cli-argparse')
  , utils = require('./util')
  //, options = {
      //'-p, --package=[FILE]': 'Use package descriptor',
      //'-t, --type=[TYPE]': 'Output renderer type',
      //'-h, --help': 'Display this help and exit',
      //'--version': 'Print the version and exit'
    //}
  , hints = {
      options: [
        '-t',
        '-p'
      ],
      flags: [
        '--help'
      ],
      alias: {
        '-p --package': 'pkg',
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

  // user defined package.json with additional meta data
  var args = parser(argv, hints)
    , pack
    , pth = args.options.pkg;

  if(pth) {
    if(!/^\//.test(pth)) {
      pth = path.join(process.cwd(), pth);
    }
    try {
      pack = require(pth);
    }catch(e) {
      return cb(e); 
    }
  }

  var opts = {
        input: process.stdin, 
        output: process.stdout,
        type: args.options.type || cli.types.json,
        pkg: pack
      };

  if(args.flags.help) {
    return cb(null, utils.help('doc/help/mkcli.txt'));
  }else if(args.flags.version) {
    return cb(null, utils.version(pkg));
  }

  cli(opts, cb);
}

module.exports = prg;
