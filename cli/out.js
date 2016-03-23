var fs = require('fs')
  , out = require('mkout')
  , parser = require('cli-argparse')
  , utils = require('./util')
  , options = {
      '-m, --html': 'Set output renderer to HTML',
      '-x, --xml': 'Set output renderer to XML',
      '-y, --yaml': 'Set output renderer to YAML',
      '-Y, --yaml-full': 'Do not compact YAML output',
      '-t, --text': 'Set output renderer to TEXT',
      '-j, --json': 'Pass through input JSON',
      '-o, --output=[FILE]': 'Write output to FILE (default: stdout)',
      '-h, --help': 'Display this help and exit',
      '--version': 'Print the version and exit'
    }
  , hints = {
      options: [
        '-o'
      ],
      flags: [
        '--html',
        '--xml',
        '--yaml',
        '--yaml-full',
        '--text',
        '--json',
        '--help'
      ],
      alias: {
        '-m --html': 'html',
        '-x --xml': 'xml',
        '-y --yaml': 'yaml',
        '-Y --yaml-full': 'yamlFull',
        '-t --text': 'text',
        '-j --json': 'json',
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
  opts.render = {};
  opts.cli = true;

  if(args.options.output) {
    opts.output = fs.createWriteStream(args.options.output);
  }

  // support --xml, --html etc.
  for(k in out.types) {
    if(args.flags[k]) {
      opts.type = k;
      break;
    } 
  } 

  if(args.flags.json) {
    opts.type = 'json';
  }

  if(args.flags.yamlFull) {
    opts.render.compact = false; 
  }

  if(args.flags.help) {
    utils.usage(pkg, options);
    return cb();
  }else if(args.flags.version) {
    utils.version(pkg);
    return cb();
  }

  out(opts, cb);
}

module.exports = cli;
