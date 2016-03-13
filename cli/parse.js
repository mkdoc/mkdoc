var mkparse = require('mkparse')
  , Collator = require('mkparse/lib/collator')
  , parser = require('cli-argparse')
  , usage = require('./usage')
  , version = require('./version')
  , options = {
      '-c, --content': 'Print non-comment content.',
      '-d, --dotted': 'Parse dotted names.',
      '-j, --json': 'Print comments as JSON.',
      '-i, --indent=[NUM]': 'Number of spaces for JSON (default: 0).',
      '-h, --help': 'Display this help and exit.',
      '--version': 'Print the version and exit.'
    }
  , hints = {
      flags: [
        '--dotted', '--content'
      ],
      options: [
        '-i'
      ],
      alias: {
        '-c --content': 'content',
        '-j --json': 'json',
        '-i --indent': 'indent',
        '-h --help': 'help',
        '-d --dotted': 'dotted'
      }
    }
  , pkg = require('mkparse/package.json');

/**
 *  Parse comments in files.
 */
function cli(argv, cb) {

  if(typeof argv === 'function') {
    cb = argv;
    argv = null;
  }

  var args = parser(argv, hints)
    , opts = {
        dotted: args.flags.dotted
      }
    , files = args.unparsed;

  if(!files.length) {
    return cb(new Error('no files specified')); 
  }

  opts.files = args.unparsed;
  opts.output = process.stdout;
  opts.content = Boolean(args.flags.content);

  if(args.flags.help) {
    usage(pkg, options);
    return cb();
  }else if(args.flags.version) {
    version(pkg);
    return cb();
  }

  function next() {
    var file = files.shift();
    if(!file) {
      return cb();  
    } 
    var stream = mkparse.load(file, opts, next)
      , collator;

    if(args.flags.json) {
      stream = stream.stringify(
        parseInt(args.options.indent) || 0, !opts.content ? true : false);
      stream.pipe(opts.output);
    }else{
      collator = new Collator(opts);      
      stream.pipe(collator).pipe(opts.output);
    }
  }

  next();
}

module.exports = cli;
