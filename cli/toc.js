var toc = require('mktoc')
  , parser = require('cli-argparse')
  , utils = require('./util')
  , hints = {
      options: [
        '-t',
        '-l',
        '-d',
        '-m',
        '-b',
        '-p',
        '-B',
        '-E'
      ],
      flags: [
        '--disable',
        '--ordered',
        '--standalone',
        '--help'
      ],
      alias: {
        '-t --title': 'title',
        '-l --level': 'level',
        '-d --depth': 'depth',
        '-m --max': 'max',
        '-p --prefix': 'prefix',
        '-b --base': 'base',
        '-B --bullet': 'bullet',
        '-E --delimiter': 'delimiter',
        '-D --disable': 'disable',
        '-o --ordered': 'ordered',
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

  if(args.flags.help) {
    return cb(null, utils.help('doc/help/mktoc.txt'));
  }else if(args.flags.version) {
    return cb(null, utils.version(pkg));
  }

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
    base: args.options.base,
    prefix: args.options.prefix,
    link: !args.flags.disable,
    bullet: args.options.bullet,
    delimiter: args.options.delimiter,
    level: level,
    depth: depth,
    max: max
  };

  if(args.flags.ordered) {
    opts.type = 'ordered'; 
  }

  toc(opts, cb);
}

module.exports = cli;
