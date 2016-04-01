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
function main(argv, conf, cb) {

  /* istanbul ignore if: always pass argv in test env */
  if(typeof argv === 'function') {
    cb = argv;
    argv = null;
  }

  /* istanbul ignore if: always pass conf in test env */
  if(typeof conf === 'function') {
    cb = conf;
    conf = null;
  }

  /* istanbul ignore next: always pass conf in test env */
  conf = conf || {};
  /* istanbul ignore next: never print to stdout in test env */
  conf.output = conf.output || process.stdout;

  var opts = {
      input: process.stdin, 
      output: conf.output,
      transforms: []
    }
    , runtime = {
        base: path.normalize(path.join(__dirname, '..')),
        target: opts,
        hints: prg,
        help: {
          file: 'doc/help/mktransform.txt',
          output: conf.output
        },
        version: {
          name: pkg.name,
          version: pkg.version,
          output: conf.output
        },
        plugins: [
          require('mkcli/plugin/hints'),
          require('mkcli/plugin/argv'),
          require('mkcli/plugin/help'),
          require('mkcli/plugin/version')
        ]
      };

  prg.run(argv, runtime, function parsed(err, req) {
    if(err || req.aborted) {
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

main.pkg = pkg;

module.exports = main;
