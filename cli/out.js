var fs = require('fs')
  , out = require('mkout')
  , parser = require('cli-argparse')
  , utils = require('./util')
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
