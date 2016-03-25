var toc = require('mktoc')
  , parser = require('cli-argparse')
  , utils = require('./util')
  , options = {
      '-t, --title=[TITLE]': 'Set initial heading',
      '-l, --level=[NUM]': 'Set level for initial heading',
      '-d, --depth=[LEVEL]': 'Ignore headings below LEVEL',
      '-m, --max=[LEVEL]': 'Ignore headings above LEVEL',
      '-s, --standalone': 'Standalone index, discards input',
      '-h, --help': 'Display this help and exit',
      '--version': 'Print the version and exit'
    }
  , hints = {
      options: [
        '-t',
        '-l',
        '-d',
        '-m'
      ],
      flags: [
        '--standalone',
        '--help'
      ],
      alias: {
        '-t --title': 'title',
        '-l --level': 'level',
        '-d --depth': 'depth',
        '-m --max': 'max',
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
    , level = parseInt(args.options.level) || 1
    , depth = parseInt(args.options.depth) || 1
    , max = parseInt(args.options.max) || 6;

  if(level < 1) {
    level = 1; 
  }

  if(depth < 1) {
    depth = 1; 
  }

  if(max < 1) {
    max = 1; 
  }

  var opts = {
        input: process.stdin, 
        output: process.stdout,
        standalone: args.flags.standalone,
        title: args.options.title,
        level: level,
        depth: depth,
        max: max
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
