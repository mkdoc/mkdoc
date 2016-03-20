var filter = require('mkfilter')
  , ast = require('mkast')
  , Node = ast.Node
  , types = Node.types
  , parser = require('cli-argparse')
  , utils = require('./util')
  , keys = {}
  , options = {
    '-i, --invert': 'Invert the filter'
  }
  , append = {
      '-h, --help': 'Display this help and exit',
      '--version': 'Print the version and exit'
    }
  , filters = {}
  , k
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

//
types.forEach(function(type) {
  filters[type] = false;
  var key = type.replace(/_/g, '-')
    , nm = '--' + key;
  keys[key] = type;
  options[nm] = 'Filter ' + type.replace(/_/g, ' ') + ' nodes';
  hints.flags.push(nm);
})

for(k in append) {
  options[k] = append[k];
}

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
    utils.usage(pkg, options);
    return cb();
  }else if(args.flags.version) {
    utils.version(pkg);
    return cb();
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
