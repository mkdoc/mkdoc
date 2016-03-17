var parser = require('cli-argparse')
  , parse = require('mkapi')
  , pkg = require('mkapi/package.json')
  , utils = require('./util')
  , options = {
      synopsis: '[options] [files...]',
      '-o, --output=[FILE]': 'Write output to FILE (default: stdout).',
      '-t, --title=[VAL]': 'Title for initial heading.',
      '-l, --level=[NUM]': 'Initial heading level (default: 1).',
      '-L, --lang=[LANG]':
        'Language for fenced code blocks (default: javascript).',
      '-i, --indent=[NUM]': 'Number of spaces for JSON (default: 2).',
      '-a, --ast': 'Print AST as JSON.',
      '--[no]-private': 'Enable or disable private symbols',
      '--[no]-protected': 'Enable or disable protected symbols',
      '-h, --help': 'Display this help and exit.',
      '--version': 'Print the version and exit.'
    }
  , hints = {
      options: [
        '-l', '-t', '-o', '-i', '-L'
      ],
      flags: [
        '--ast', '--help'
      ],
      alias: {
        '-a --ast': 'ast',
        '-l --level': 'level',
        '-L --lang': 'lang',
        '-t --title': 'title',
        '-i --indent': 'indent',
        '-o --output': 'output',
        '-h --help': 'help'
      }
    }
  , opts = {conf: {include: {}}};

function cli(argv, cb) {
  if(typeof argv === 'function') {
    cb = argv;
    argv = null;
  }

  var args = parser(argv, hints);

  if(args.flags.h || args.flags.help) {
    return utils.usage(pkg, options);
  }else if(args.flags.version) {
    return utils.version(pkg);
  }

  if(!args.unparsed.length) {
    return cb(new Error('no files specified'));
  }

  if(args.options.level && !parseInt(args.options.level)) {
    return cb(new Error('--level must be an integer'));
  }

  opts.level = parseInt(args.options.level);
  opts.ast = args.flags.ast;
  opts.indent = parseInt(args.options.indent);
  opts.lang = args.options.lang;

  if(args.options.title !== undefined) {
    opts.heading = args.options.title;
  }

  if(args.flags.private !== undefined) {
    opts.conf.include.private = args.flags.private;
  }

  if(args.flags.protected !== undefined) {
    opts.conf.include.protected = args.flags.protected;
  }

  parse(args.unparsed, opts, function(err) {
    if(err) {
      return cb(err); 
    }
    cb(null);
  });
}

module.exports = cli;
