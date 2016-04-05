var path = require('path')
  , filter = require('mkfilter')
  , cli = require('mkcli')
  , ast = require('mkast')
  , Node = ast.Node
  , types = Node.types.concat(Node.extensions)
  , def = require('../doc/cli/mkfilter.json')
  , pkg = require('mkfilter/package.json')
  , prg = cli.load(def)
  , keys = {}
  , filters = {}

types.forEach(function(type) {
  var key = type.replace(/_/g, '-');
  filters[type] = false;
  keys[cli.camelcase(key)] = type;
})

/**
 *  @name mkfilter
 *  @cli doc/cli/mkfilter.md
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
  /* istanbul ignore next: never read from stdin in test env */
  conf.input = conf.input || process.stdin;

  var opts = {
      input: conf.input,
      output: conf.output
    }
    , runtime = {
        base: path.normalize(path.join(__dirname, '..')),
        target: opts,
        hints: prg,
        help: {
          file: 'doc/help/mkfilter.txt',
          output: conf.output
        },
        version: {
          name: pkg.name,
          version: pkg.version,
          output: conf.output
        },
        plugins: [
          require('mkcli/plugin/epipe'),
          require('mkcli/plugin/hints'),
          require('mkcli/plugin/argv'),
          require('mkcli/plugin/help'),
          require('mkcli/plugin/version')
        ]
      };

  cli.run(prg, argv, runtime, function parsed(err, req) {
    if(err || req.aborted) {
      return cb(err); 
    }

    var k
      , type;

    // check args for switches and update filters
    for(k in keys) {
      if(this[k] === true) {
        type = keys[k];
        filters[type] = true;
      } 
    }

    // invert flags
    if(this.invert) {
      for(k in filters) {
        filters[k] = !filters[k];
      } 
    }

    // assign final values
    for(k in filters) {
      this[k] = filters[k];
    }

    filter(this, cb);
  })
}

main.pkg = pkg;

module.exports = main;
