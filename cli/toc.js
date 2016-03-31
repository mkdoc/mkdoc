var path = require('path')
  , toc = require('mktoc')
  , bin = require('mkcli')
  , def = require('../doc/cli/mktoc.json')
  , pkg = require('mktoc/package.json')
  , prg = bin.load(def, pkg);

/**
 *  @name mktoc
 *  @cli doc/cli/mktoc.md
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
          file: 'doc/help/mktoc.txt'
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

    var level = parseInt(this.level) || 1
      , depth = parseInt(this.depth) || 1
      , max = parseInt(this.max) || 6;

    if(level < 1) {
      level = 1; 
    }

    if(depth < 1) {
      depth = 1; 
    }

    if(max < 1) {
      max = 1; 
    }

    this.standalone = this.standalone;
    this.title = this.title;
    this.base = this.base;
    this.prefix = this.prefix;
    this.link = !this.disable;
    this.bullet = this.bullet;
    this.delimiter = this.delimiter;
    this.level = level;
    this.depth = depth;
    this.max = max;

    if(this.ordered) {
      this.type = 'ordered'; 
    }

    toc(this, cb);
  })
}

module.exports = main;
