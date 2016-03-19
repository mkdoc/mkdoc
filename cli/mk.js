var path = require('path')
  , fs = require('fs')
  , mk = require('mktask')
  , parser = require('cli-argparse')
  , utils = require('./util')
  , options = {
      name: 'mk',
      synopsis: '[task...]',
      '-h': 'Print task information',
      '--help': 'Display this help and exit',
      '--version': 'Print the version and exit'
    }
  , hints = {
      options: [],
      flags: [],
      alias: {}
    }
  , NAME = process.env.TASK_FILE || 'mk.js'
  , pkg = require('mktask/package.json');

var deps = {
  abs: require('mkabs'),
  api: require('mkapi'),
  ast: require('mkast'),
  cat: require('mkcat'),
  msg: require('mkmsg'),
  out: require('mkout'),
  parse: require('mkparse'),
  pi: require('mkpi'),
  ref: require('mkref')
};

// decorate with `doc` function
mk.doc = require('../index');

// static stream creation access
for(var k in deps) {
  mk[k] = deps[k];
}

/**
 *  Run task build files.
 */
function cli(argv, cb) {

  if(typeof argv === 'function') {
    cb = argv;
    argv = null;
  }

  var args = parser(argv, hints);

  if(args.flags.h) {
    console.dir('@todo show task info: parse comments'); 
    return cb();
  }else if(args.flags.help) {
    utils.usage(pkg, options);
    return cb();
  }else if(args.flags.version) {
    utils.version(pkg);
    return cb();
  }

  var dir = process.cwd()
    , file = path.join(dir, NAME)
    , tasks
    , list
    , stat;

  function get() {
    try {
      stat = fs.statSync(file)
    // ok if the file does not exist, searching parents
    }catch(e) {}

    if(stat && stat.isFile()) {
      try {
        return require(file);
      }catch(e) {
        return cb(e); 
      }
    }
  }

  while(!(tasks = get(file))) {
    dir = path.dirname(dir);
    file = path.join(dir, NAME);
    if(dir === '/') {
      break; 
    }
  }

  if(!tasks) {
    return cb(
      new Error(
        'no task file (' + NAME + ') found in ' + process.cwd()
        + ' or any parent directories '
      )); 
  }

  var collection = mk.task()
    , runner;

  if(!collection.tasks.length) {
    return cb(
      new Error(
        'task file ' + file + ' does not define task functions'
      )); 
  }

  runner = collection.run();
  list = args.unparsed;

  for(var i = 0;i < list.length;i++) {
    if(!runner.get(list[i])) {
      return cb(
        new Error('task not found: ' + list[i])); 
    } 
  }

  // set up execution scope for default task collection
  runner.scope = deps;

  if(!list.length) {
    // try to run the main function 
    if(runner.get(runner.MAIN)) {
      runner.exec(runner.MAIN, cb);
    }else{
      runner.each(cb);
    }
  }else{
    runner.each(list, cb);  
  }
}

module.exports = cli;
