var path = require('path')
  , fs = require('fs')
  , mk = require('mktask')
  , mkparse = require('mkparse')
  , parser = require('cli-argparse')
  , utils = require('./util')
  , options = {
      name: 'mk',
      synopsis: '[task...]',
      '-f, --file=[FILE...]': 'Load specific task files',
      '--tasks': 'Print task comments',
      '-h, --help': 'Display this help and exit',
      '--version': 'Print the version and exit'
    }
  , hints = {
      options: [
        '-f'
      ],
      flags: [
        '--tasks'
      ],
      alias: {
        '-f --file': 'files',
        '-h --help': 'help'
      }
    }
  , NAME = process.env.TASK_FILE || 'mkdoc.js'
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

function print(files, runner, cb) {
  var list = files.slice();

  function next(err) {
    if(err) {
      return cb(err); 
    }

    var file = list.shift();
    if(!file) {
      return cb(); 
    }

    var parse = mkparse.load(file, next);
    parse.on('comment', function(comment) {
      var missing;
      //console.dir(comment);
      comment.tags.forEach(function(tag) {
        missing = '';
        if(tag.id === 'task') {
          if(!runner.get(tag.name)) {
            missing = ' (missing)'; 
          }
          console.log('TASK | [%s] %s%s', tag.name, tag.description, missing); 
        }
      })
    })
  }

  next();
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

  if(args.flags.help) {
    utils.usage(pkg, options);
    return cb();
  }else if(args.flags.version) {
    utils.version(pkg);
    return cb();
  }

  var dir = process.cwd()
    , file = path.join(dir, NAME)
    , files = args.options.files
    , tasks
    , list
    , stat;

  function get(file, strict) {
    try {
      stat = fs.statSync(file)
    // ok if the file does not exist, searching parents
    }catch(e) {}

    if(strict && (!stat || stat && !stat.isFile())) {
      return cb(new Error('invalid file: ' + file)); 
    }

    if(stat && stat.isFile()) {
      try {
        return require(file);
      }catch(e) {
        return cb(e); 
      }
    }
  }

  if(files) {

    if(!Array.isArray(files)) {
      files = [files]; 
    }

    files.forEach(function(file) {
      if(!/^\.?\//.test(file)) {
        file = path.join(process.cwd(), file);
      }
      tasks = get(file, true);
    })
  
  }else{
    while(!(tasks = get(file))) {
      dir = path.dirname(dir);
      file = path.join(dir, NAME);
      if(dir === '/') {
        break; 
      }
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

  if(args.flags.tasks) {

    // print from auto-detected file
    if(!files) {
      files = [file];
    }
       
    return print(files, runner, cb); 
  }

  for(var i = 0;i < list.length;i++) {
    if(!runner.get(list[i])) {
      return cb(
        new Error('task not found: ' + list[i])); 
    } 
  }

  // set up execution scope for default task collection
  runner.scope = {args: args};

  runner.each(list, cb);  
}

module.exports = cli;
