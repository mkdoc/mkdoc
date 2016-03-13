var cat = require('mkcat')
  , parser = require('cli-argparse');

/**
 *  Process the command line arguments and print files.
 */
function cli(args, cb) {
  var argv = parser(args)
    , opts = {};
  opts.files = argv.unparsed;
  opts.output = process.stdout;
  cat(opts, cb);
}

module.exports = cli;
