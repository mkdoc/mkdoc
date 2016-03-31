var path = require('path')
  , level = require('mklevel')
  , bin = require('mkcli')
  , def = require('../doc/cli/mklevel.json')
  , pkg = require('mklevel/package.json')
  , prg = bin.load(def, pkg);

/**
 *  @name mklevel
 *  @cli doc/cli/mklevel.md
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
          file: 'doc/help/mklevel.txt'
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

    var levels = []
      , i
      , num = 6
      , val;

    // propagate all option first
    if(this.all) {
      val = parseInt(this.all) || 0;
    }

    for(i = 0;i < num;i++) {
      // zero fill first
      levels[i] = 0;

      // update with --all when specified
      if(val !== undefined) {
        levels[i] = val;
      }

      // got a specific level flag
      if(this[i + 1] !== undefined) {
        levels[i] = parseInt(this[i + 1]) || 0;
      }
    }

    this.levels = levels;

    level(this, cb);
  })
}

module.exports = main;
