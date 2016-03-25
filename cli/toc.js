var toc = require('mktoc')
  , parser = require('cli-argparse')
  , utils = require('./util')
  , options = {
      '-t, --title=[TITLE]': 'Set initial heading',
      '-l, --level=[NUM]': 'Set initial heading level',
      '-d, --depth=[NUM]': 'Ignore headings below a depth',
      '-s, --standalone': 'Create standalone index',
      '-h, --help': 'Display this help and exit',
      '--version': 'Print the version and exit'
    }
  , hints = {
      options: [
        '-t',
        '-l',
        '-d'
      ],
      flags: [
        '--standalone',
        '--help'
      ],
      alias: {
        '-t --title': 'title',
        '-l --level': 'level',
        '-d --depth': 'depth',
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
    , depth = parseInt(args.options.depth) || 1;

  if(level < 1) {
    level = 1; 
  }

  if(depth < 1) {
    depth = 1; 
  }

  var opts = {
        input: process.stdin, 
        output: process.stdout,
        standalone: args.flags.standalone,
        title: args.options.title,
        level: level,
        depth: depth
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
