var filter = require('mkfilter')
  , ast = require('mkast')
  , Node = ast.Node
  , parser = require('cli-argparse')
  , utils = require('./util')
  , keys = {}
  , filters = {}
  , hints = {
      options: [
      ],
      flags: [
        '--invert',
        '--help'
      ],
      alias: {
        '-i --invert': 'invert',
        '-h --help': 'help'
      },
      camelcase: false
    }
  , pkg = require('mkfilter/package.json');

// update hints
var types = Node.types.concat(Node.extensions);
types.forEach(function(type) {
  filters[type] = false;
  var key = type.replace(/_/g, '-')
    , nm = '--' + key;
  keys[key] = type;
  hints.flags.push(nm);
})

/**
 *  Filter nodes by type.
 */
function cli(argv, cb) {

  if(typeof argv === 'function') {
    cb = argv;
    argv = null;
  }

  var args = parser(argv, hints)
    , opts = {
        input: process.stdin, 
        output: process.stdout
      };

  if(args.flags.help) {
    return cb(null, utils.help('doc/help/mkfilter.txt'));
  }else if(args.flags.version) {
    return cb(null, utils.version(pkg));
  }

  var k
    , type;

  // check args for switches and update filters
  for(k in keys) {
    if(args.flags[k]) {
      type = keys[k];
      filters[type] = true;
    } 
  }

  // invert flags
  if(args.flags.invert) {
    for(k in filters) {
      filters[k] = !filters[k];
    } 
  }

  for(k in filters) {
    opts[k] = filters[k];
  }

  filter(opts, cb);
}

module.exports = cli;
