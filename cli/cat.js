var cat = require('mkcat')
  , parser = require('cli-argparse')
  , utils = require('./util')
  , hints = {
      options: [
      ],
      flags: [
        '--ast'
      ],
      alias: {
        '-a --ast': 'ast',
        '-h --help': 'help'
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
  opts.serialize = true;

  if(args.flags.ast === false) {
    opts.buffer = true; 
  }

  if(args.flags.help) {
    return cb(null, utils.help('doc/help/mkcat.txt'));
  }else if(args.flags.version) {
    return cb(null, utils.version(pkg));
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
      return cb(null, utils.help('doc/help/mkcat.txt'));
    } 
  })
}

module.exports = cli;
