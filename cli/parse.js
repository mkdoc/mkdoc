//var parser = require('../index')
  //, json = Boolean(~process.argv.indexOf('--json'))
  //, opts = {dotted: true}
  //, stream = parser.load(process.argv[2], opts);

//if(!json) {
  //stream.on('comment', function(comment) {
    //console.dir(comment)
  //});
//}else{
  //stream = stream.stringify(parseInt(process.env.INDENT), true);
  //stream.pipe(process.stdout);
//}

//stream.on('end', function() {
  ////console.dir('ended');
//});

//stream.on('finish', function() {
  ////console.dir('finished');
//});

var mkparse = require('mkparse')
  , parser = require('cli-argparse')
  , usage = require('./usage')
  , version = require('./version')
  , options = {
      '-d, --dotted': 'Parse dotted names.',
      '-j, --json': 'Print comments as JSON.',
      '-i, --indent=[NUM]': 'Number of spaces for JSON (default: 0).',
      '-h, --help': 'Display this help and exit.',
      '--version': 'Print the version and exit.'
    }
  , hints = {
      flags: [
        '--dotted'
      ],
      options: [
        '-i'
      ],
      alias: {
        '-j --json': 'json',
        '-i --indent': 'indent',
        '-h --help': 'help',
        '-d --dotted': 'dotted'
      }
    }
  , pkg = require('mkparse/package.json');

/**
 *  Write AST to a renderer.
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
    var stream = mkparse.load(file, opts, next);
    if(args.flags.json) {
      stream = stream.stringify(parseInt(process.env.INDENT), true);
      stream.pipe(process.stdout);
    }
  }

  next();
}

module.exports = cli;
