var path = require('path')
  , transform = require('mktransform')
  , parser = require('cli-argparse')
  , utils = require('./util')
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
    return cb(null, utils.help('doc/help/mktransform.txt'));
  }else if(args.flags.version) {
    return cb(null, utils.version(pkg));
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
