var fs = require('fs')
  , out = require('mkout')
  , parser = require('cli-argparse')
  , usage = require('./usage')
  , version = require('./version')
  , options = {
      '-m, --md': 'Set output renderer to markdown (default).',
      '-h, --html': 'Set output renderer to HTML.',
      '-x, --xml': 'Set output renderer to XML.',
      '-j, --json': 'Pass through input JSON.',
      '-t, --type=[TYPE]': 'Set the output renderer type.',
      '-o, --output=[FILE]': 'Write output to FILE (default: stdout).',
      '--help': 'Display this help and exit.',
      '--version': 'Print the version and exit.'
    }
  , hints = {
      options: [
        '-t',
        '-o'
      ],
      alias: {
        '-o --output': 'output',
        '-h --html': 'html',
        '-x --xml': 'xml',
        '-j --json': 'json',
        '-m --md': 'markdown',
        '-t --type': 'type'
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

  opts.files = args.unparsed;
  opts.output = process.stdout;

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

  if(args.flags.help) {
    usage(pkg, options);
    return cb();
  }else if(args.flags.version) {
    version(pkg);
    return cb();
  }

  function done(err, res) {
    cb(err, res);
  }

  out(opts, done);
}

module.exports = cli;
