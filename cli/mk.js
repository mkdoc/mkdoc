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

  if(!list.length) {
    // try to run the main function 
    runner.exec(runner.MAIN, cb);
  }else{
     
  }

  //console.dir(list);
  //console.dir(file);
  //console.dir(tasks);
  //console.dir(collection);
}

module.exports = cli;
