var path = require('path')
  , mkparse = require('mkparse')
  , lang = require('mkparse/lang')
  , Collator = require('mkparse/lib/collator')
  , parser = require('cli-argparse')
  , usage = require('./usage')
  , version = require('./version')
  , options = {
      '-l, --lang=[LANG]': 'Set language for all files.',
      '-s, --strip': 'Print content only, remove comments.',
      '-c, --content': 'Include non-comment content.',
      '-d, --dotted': 'Parse dotted names.',
      '-j, --json': 'Print comments as JSON.',
      '-i, --indent=[NUM]': 'Number of spaces for JSON (default: 0).',
      '-h, --help': 'Display this help and exit.',
      '--version': 'Print the version and exit.'
    }
  , hints = {
      flags: [
        '--dotted', '--content', '--strip'
      ],
      options: [
        '-i',
        '-l'
      ],
      alias: {
        '-l --lang': 'lang',
        '-s --strip': 'strip',
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

  opts.files = args.unparsed;
  opts.output = process.stdout;
  opts.content = Boolean(args.flags.content);

  if(args.flags.strip) {
    opts.content = true;
    opts.comment = false;

    // not printing comments, cannot print json
    args.flags.json = false;
  }

  if(args.flags.help) {
    usage(pkg, options);
    return cb();
  }else if(args.flags.version) {
    version(pkg);
    return cb();
  }

  if(!files.length) {
    return cb(new Error('no files specified')); 
  }

  if(args.options.lang && !lang.map[args.options.lang]) {
    return cb(new Error('unknown language pack id: ' + args.options.lang)); 
  }

  function next() {
    var file = files.shift();
    if(!file) {
      return cb();  
    } 

    var name = path.basename(file)
      , ext = name.substr(name.lastIndexOf('.'))
      , id
      , pack = args.options.lang;

    if(!pack && ext) {
      ext = ext.replace(/^\./, '');
      id = lang.find(ext);
      // not a trailing period if still not the empty string
      if(ext && id) {
        pack = id; 
      }
    }

    if(pack && lang.exists(pack)) {
      opts.rules = lang.load(pack);
    }

    if(!pack) {
      console.error('unkown language for file %s (skipping)', file); 
      return next();
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
