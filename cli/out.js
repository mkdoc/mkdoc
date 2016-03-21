var fs = require('fs')
  , out = require('mkout')
  , parser = require('cli-argparse')
  , utils = require('./util')
  , options = {
      '-d, --md': 'Set output renderer to markdown (default)',
      '-m, --html': 'Set output renderer to HTML',
      '-x, --xml': 'Set output renderer to XML',
      '-y, --yaml': 'Set output renderer to YAML',
      '-j, --json': 'Pass through input JSON',
      '-t, --type=[TYPE]': 'Set the output renderer type',
      '-o, --output=[FILE]': 'Write output to FILE (default: stdout)',
      '-h, --help': 'Display this help and exit',
      '--version': 'Print the version and exit'
    }
  , hints = {
      options: [
        '-t',
        '-o'
      ],
      alias: {
        '-d --md': 'markdown',
        '-m --html': 'html',
        '-x --xml': 'xml',
        '-y --yaml': 'yaml',
        '-j --json': 'json',
        '-t --type': 'type',
        '-o --output': 'output',
        '-h --help': 'help'
      }
    }
  , pkg = require('mkout/package.json');

/**
 *  Write AST to a renderer.
 */
function cli(argv, cb) {

  if(typeof argv === 'function') {
    cb = argv;
    argv = null;
  }

  var args = parser(argv, hints)
    , opts = {}
    , k;

  opts.input = process.stdin;
  opts.files = args.unparsed;
  opts.output = process.stdout;
  opts.cli = true;

  if(args.options.output) {
    opts.output = fs.createWriteStream(args.options.output);
  }

  // support --xml, --html etc.
  if(!args.options.type) {
    for(k in out.types) {
      if(args.flags[k]) {
        args.options.type = k;
        break;
      } 
    } 

    if(args.flags.json) {
      args.options.type = 'json';
    }
  }

  if(args.options.type) {
    opts.type = args.options.type;
  }

  if(args.flags.h || args.flags.help) {
    utils.usage(pkg, options);
    return cb();
  }else if(args.flags.version) {
    utils.version(pkg);
    return cb();
  }

  out(opts, cb);
}

module.exports = cli;
