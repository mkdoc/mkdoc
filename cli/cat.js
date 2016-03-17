var cat = require('mkcat')
  , parser = require('cli-argparse')
  , utils = require('./util')
  , options = {
      synopsis: '[options] [files...]',
      '--no-ast': 'Disable AST output, prints input',
      '-h, --help': 'Display this help and exit',
      '--version': 'Print the version and exit'
    }
  , hints = {
      options: [
      ],
      flags: [
        '--ast'
      ],
      alias: {
        '-a --ast': 'ast'
      }
    }
  , pkg = require('mkcat/package.json');

/**
 *  Concatenate stdin with file arguments.
 */
function cli(argv, cb) {
  if(typeof argv === 'function') {
    cb = argv;
    argv = null;
  }
  var args = parser(argv, hints)
    , opts = {};

  // read from stdin before files, but be aware that file
  // information is lost so relative includes will not work as expected
  opts.input = process.stdin;

  opts.files = args.unparsed;
  opts.output = process.stdout;

  if(args.flags.ast === false) {
    opts.buffer = true; 
  }

  if(args.flags.h || args.flags.help) {
    utils.usage(pkg, options);
    return cb();
  }else if(args.flags.version) {
    utils.version(pkg);
    return cb();
  }

  function done(err, res) {
    if(res && res.once instanceof Function) {
      res.once('error', cb);
      // listen for the end of the write stream
      return res.once('end', done);
    }
    if(opts.buffer && res) {
      opts.output.write(res); 
    }
    process.stdin.end();
    cb(err, res);
  }

  var stream = cat(opts, done);
  stream.once('stdin', function(size, files) {
    if(!size && !files.length) {
      utils.usage(pkg, options);
      return cb();
    } 
  })
}

module.exports = cli;
