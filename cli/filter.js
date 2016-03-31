var path = require('path')
  , filter = require('mkfilter')
  , bin = require('mkcli')
  , ast = require('mkast')
  , Node = ast.Node
  , types = Node.types.concat(Node.extensions)
  , def = require('../doc/cli/mkfilter.json')
  , pkg = require('mkfilter/package.json')
  , prg = bin.load(def, pkg)
  , keys = {}
  , filters = {}

types.forEach(function(type) {
  filters[type] = false;
  var key = type.replace(/_/g, '-');
  keys[prg.camelcase(key)] = type;
})

/**
 *  @name mkfilter
 *  @cli doc/cli/mkfilter.md
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
          file: 'doc/help/mkfilter.txt'
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

module.exports = main;
