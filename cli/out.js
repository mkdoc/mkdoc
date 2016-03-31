var fs = require('fs')
  , out = require('mkout')
  , parser = require('cli-argparse')
  , utils = require('./util')
  //, options = {
      //'-o, --output=[FILE]': 'Write output to FILE (default: stdout)',
      //'-H, --html': 'Set output renderer to HTML',
      //'-j, --json': 'Set output renderer to JSON',
      //'-m, --man': 'Set output renderer to MAN',
      //'-t, --text': 'Set output renderer to TEXT',
      //'-x, --xml': 'Set output renderer to XML',
      //'-y, --yaml': 'Set output renderer to YAML',
      //'-Y, --yaml-full': 'Do not compact YAML output',
      //'-n, --noop': 'Pass through input JSON',
      //'-h, --help': 'Display this help and exit',
      //'--version': 'Print the version and exit'
    //}
  , hints = {
      options: [
        '-o'
      ],
      flags: [
        '--html',
        '--xml',
        '--man',
        '--yaml',
        '--yaml-full',
        '--text',
        '--json',
        '--noop',
        '--help'
      ],
      alias: {
        '-H --html': 'html',
        '-x --xml': 'xml',
        '-m --man': 'man',
        '-y --yaml': 'yaml',
        '-Y --yaml-full': 'yamlFull',
        '-t --text': 'text',
        '-j --json': 'json',
        '-n --noop': 'noop',
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

  if(args.flags.help) {
    return cb(null, utils.help('doc/help/mkout.txt'));
  }else if(args.flags.version) {
    return cb(null, utils.version(pkg));
  }

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

  if(args.flags.noop) {
    opts.type = out.NOOP;
  }

  if(args.flags.yamlFull) {
    // implies yaml type, means that -yY is not necessary -Y is enough
    opts.type = 'yaml';
    opts.render.compact = false; 
  }

  out(opts, cb);
}

module.exports = cli;
