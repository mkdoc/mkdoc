var path = require('path')
  , msg = require('mkmsg')
  , bin = require('mkcli')
  , def = require('../doc/cli/mkmsg.json')
  , pkg = require('mkmsg/package.json')
  , prg = bin.load(def, pkg);

/**
 *  @name mkmsg
 *  @cli doc/cli/mkmsg.md
 */
function main(argv, cb) {

  if(typeof argv === 'function') {
    cb = argv;
    argv = null;
  }

  var opts = {
      input: process.stdin, 
      output: process.stdout
    }
    , runtime = {
        base: path.normalize(path.join(__dirname, '..')),
        target: opts,
        hints: prg,
        help: {
          file: 'doc/help/mkmsg.txt'
        },
        version: pkg,
        plugins: [
          require('mkcli/plugin/hints'),
          require('mkcli/plugin/argv'),
          require('mkcli/plugin/help'),
          require('mkcli/plugin/version')
        ]
      };

  prg.run(argv, runtime, function parsed(err) {
    if(err) {
      return cb(err); 
    }
    msg(this, cb);
  })
}

module.exports = main;
