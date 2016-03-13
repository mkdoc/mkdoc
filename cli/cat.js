var cat = require('mkcat')
  , parser = require('cli-argparse')
  , usage = require('./usage')
  , version = require('./version')
  , options = {
    //'-o, --output=[FILE]': 'Write output to FILE (default: stdout).',
    //'-t, --title=[VAL]': 'Title for initial heading.',
    //'-l, --level=[NUM]': 'Initial heading level (default: 1).',
    //'-L, --lang=[LANG]':
      //'Language for fenced code blocks (default: javascript).',
    //'-i, --indent=[NUM]': 'Number of spaces for JSON (default: 2).',
    //'-a, --ast': 'Print AST as JSON.',
    //'--[no]-private': 'Enable or disable private symbols',
    //'--[no]-protected': 'Enable or disable protected symbols',
    '-h, --help': 'Display this help and exit.',
    '--version': 'Print the version and exit.'
  }
  , pkg = require('mkcat/package.json');

/**
 *  Concatenate stdin with file arguments.
 */
function cli(argv, cb) {
  var args = parser(argv)
    , opts = {};
  opts.files = args.unparsed;
  opts.output = process.stdout;

  if(args.flags.h || args.flags.help) {
    return usage(pkg, options);
  }else if(args.flags.version) {
    return version(pkg);
  }

  var stream = cat(opts, cb);
  stream.once('stdin', function(size, files) {
    if(!size && !files.length) {
      usage(pkg, options);
      process.exit();
    } 
  })
}

module.exports = cli;
