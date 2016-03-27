var path = require('path')
  , transform = require('mktransform')
  , parser = require('cli-argparse')
  , utils = require('./util')
  , options = {
      synopsis: '[files...]',
      '-h, --help': 'Display this help and exit',
      '--version': 'Print the version and exit'
    }
  , hints = {
      options: [
      ],
      flags: [
        '--help'
      ],
      alias: {
        '-h --help': 'help'
      }
    }
  , pkg = require('mktransform/package.json');

/**
 *  Add custom stream transformations to the pipeline.
 */
function cli(argv, cb) {
  if(typeof argv === 'function') {
    cb = argv;
    argv = null;
  }

  var args = parser(argv, hints)
    , file
    , opts = {
        input: process.stdin, 
        output: process.stdout,
        transforms: []
      };

  if(args.flags.help) {
    utils.usage(pkg, options);
    return cb();
  }else if(args.flags.version) {
    utils.version(pkg);
    return cb();
  }

  for(var i = 0;i < args.unparsed.length;i++) {
    file = args.unparsed[i];
    if(!/^\//.test(file)) {
      file = path.join(process.cwd(), file);
    }
    try {
      opts.transforms.push(require(file));
    }catch(e) {
      return cb(e); 
    }
  }

  // transform can throw on bad export
  try {
    transform(opts, cb);
  }catch(e) {
    return cb(e); 
  }
}

module.exports = cli;
