var fs = require('fs')
  , ast = require('mkast')
  , stringify = require('mkast/lib/stringify')
  , commonmark = new ast.Parser()
  , parser = require('cli-argparse')
  , usage = require('./usage')
  , version = require('./version')
  , options = {
      '-h, --help': 'Display this help and exit.',
      '--version': 'Print the version and exit.'
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
  , pkg = require('mkast/package.json');

/**
 *  Utility program for comparing AST documents.
 */
function cli(argv, cb) {

  if(typeof argv === 'function') {
    cb = argv;
    argv = null;
  }

  var args = parser(argv, hints)
    , indent = 2;

  if(args.flags.help) {
    usage(pkg, options);
    return cb();
  }else if(args.flags.version) {
    version(pkg);
    return cb();
  }

  if(!args.unparsed.length) {
    return cb(new Error('no file specified'));
  }

  function done(err) {
    cb(err);
  }

  function onRead(err, buf) {
    if(err) {
      return done(err); 
    } 

    var doc = commonmark.parse('' + buf)
      , res = stringify(doc, indent);

    process.stdout.write(res);

    done();
  }

  fs.readFile(args.unparsed[0], onRead);
}

module.exports = cli;
