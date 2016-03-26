var level = require('mklevel')
  , parser = require('cli-argparse')
  , utils = require('./util')
  , options = {
      '-1=[NUM]': 'Modify level 1 headings by NUM',
      '-2=[NUM]': 'Modify level 2 headings by NUM',
      '-3=[NUM]': 'Modify level 3 headings by NUM',
      '-4=[NUM]': 'Modify level 4 headings by NUM',
      '-5=[NUM]': 'Modify level 5 headings by NUM',
      '-6=[NUM]': 'Modify level 6 headings by NUM',
      '-a, --all=[NUM]': 'Modify all headings by NUM',
      '-h, --help': 'Display this help and exit',
      '--version': 'Print the version and exit'
    }
  , hints = {
      options: [
        '-a',
        '-1',
        '-2',
        '-3',
        '-4',
        '-5',
        '-6'
      ],
      flags: [
        '--help'
      ],
      alias: {
        '-a --all': 'all',
        '-h --help': 'help'
      }
    }
  , pkg = require('mklevel/package.json');

/**
 *  Modify heading levels.
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
      }
    , levels = []
    , i
    , num = 6
    , val;

  if(args.flags.help) {
    utils.usage(pkg, options);
    return cb();
  }else if(args.flags.version) {
    utils.version(pkg);
    return cb();
  }

  // propagate all option first
  if(args.options.all) {
    val = parseInt(args.options.all) || 0;
  }

  for(i = 0;i < num;i++) {
    // zero fill first
    levels[i] = 0;

    // update with --all when specified
    if(val !== undefined) {
      levels[i] = val;
    }

    // got a specific level flag
    if(args.options[i + 1] !== undefined) {
      levels[i] = parseInt(args.options[i + 1]) || 0;
    }
  }

  opts.levels = levels;

  level(opts, cb);
}

module.exports = cli;
