var path = require('path')
  , transform = require('mktransform')
  , bin = require('mkcli')
  , def = require('../doc/cli/mktransform.json')
  , pkg = require('mktransform/package.json')
  , prg = bin.load(def, pkg);

/**
 *  @name mktransform
 *  @cli doc/cli/mktransform.md
 */
function main(argv, cb) {

  if(typeof argv === 'function') {
    cb = argv;
    argv = null;
  }

  var opts = {
      input: process.stdin, 
      output: process.stdout,
      transforms: []
    }
    , runtime = {
        base: path.normalize(path.join(__dirname, '..')),
        target: opts,
        hints: prg,
        help: {
          file: 'doc/help/mktransform.txt'
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

    var i
      , file;

    for(i = 0;i < this.unparsed.length;i++) {
      file = this.unparsed[i];
      if(!/^\//.test(file)) {
        file = path.join(process.cwd(), file);
      }
      try {
        this.transforms.push(require(file));
      }catch(e) {
        return cb(e); 
      }
    }

    // transform can throw on bad export
    try {
      transform(this, cb);
    }catch(e) {
      return cb(e); 
    }

  })
}

module.exports = main;
