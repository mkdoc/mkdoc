var fs = require('fs')
  , path = require('path')
  , vm = require('vm')
  , EOL = require('os').EOL
  , mk = require('mktask')
  , mkparse = require('mkparse')
  , NAME = process.env.TASK_FILE || 'mkdoc.js'
  , cli = require('mkcli')
  , pkg = require('mktask/package.json')
  , prg = cli.load(require('../doc/json/mk.json'));

function print(files, runner, output, cb) {
  var list = files.slice();

  function next(err) {

    /* istanbul ignore next: files are validated earlier so tough to mock */
    if(err) {
      return cb(err); 
    }

    var file = list.shift()
      , tags = [];
    if(!file) {
      return cb(); 
    }

    var parse = mkparse.load(file, function complete() {
      var max = tags.reduce(function(prev, item) {
        return Math.max(prev, item.name.length); 
      }, 0);
      tags.forEach(function(tag) {
        var name = tag.name;
        while(name.length < max) {
          name += ' '; 
        }
        output.write(name + '  ' + tag.description);
        if(tag.missing) {
          output.write(' (missing)'); 
        }
        output.write(EOL);
      })
      next();
    });
    parse.on('comment', function(comment) {
      var missing;
      //console.dir(comment);
      comment.tags.forEach(function(tag) {
        missing = false;
        if(tag.id === 'task') {
          if(!runner.get(tag.name)) {
            missing = true;
          }
          tags.push(
            {name: tag.name, description: tag.description, missing: missing});
        }
      })
    })
  }

  next();
}

/**
 *  @name mk
 *  @cli doc/cli/mk.md
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
          file: 'doc/help/mk.txt',
          output: conf.output
        },
        version: {
          name: pkg.name.replace('task', ''),
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
      console.dir(err);
      return cb(err); 
    }

    var deps = {
      abs: require('mkabs'),
      api: require('mkapi'),
      ast: require('mkast'),
      cat: require('mkcat'),
      cli: require('mkcli'),
      exe: require('../lib/exe'),
      filter: require('mkfilter'),
      msg: require('mkmsg'),
      out: require('mkout'),
      parse: require('mkparse'),
      pi: require('mkpi'),
      ref: require('mkref'),
      toc: require('mktoc')
    };

    // decorate with `doc` function
    mk.doc = require('../index');

    // static stream creation access
    for(var k in deps) {
      mk[k] = deps[k];
    }

    var dir = process.cwd()
      , file = path.join(dir, NAME)
      , files = this.file
      , tasks
      , list
      , called = false
      , stat;

    function done(err) {
      if(!called) {
        called = true; 
        cb(err);
      } 
    }

    function get(file, strict) {
      try {
        stat = fs.statSync(file)
        // ok if the file does not exist, searching parents
      }catch(e) {}

      if(strict && (!stat || stat && !stat.isFile())) {
        return done(new Error('invalid file: ' + file)); 
      }

      function req(mod) {

        // return our reference to `mktask` so there are not 
        // module conflicts
        if(mod === 'mktask') {
          return mk; 
        }

        // resolve relative paths
        if(/^\.\.?\//.test(mod)) {
          mod = path.join(process.cwd(), mod);
        }

        //console.error('require proxy %s', mod);
        return require(mod);
      }

      var context = vm.createContext(
          {
            Buffer: Buffer,
            require: req,
            console: console,
            process: process,
            setTimeout: setTimeout,
            setInterval: setInterval,
            clearTimeout: clearTimeout,
            clearInterval: clearInterval,
            setImmediate: setImmediate,
            clearImmediate: clearImmediate
          });

      if(stat && stat.isFile()) {
        try {
          var contents = fs.readFileSync(file).toString('utf8')
            , script = new vm.Script(contents);
          script.runInContext(context, {filename: file});
          return true;
        }catch(e) {
          return done(e); 
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

      // change to parent directory of mkdoc.js
      // so that input and output paths are relative to
      // the mkdoc.js file and not the cwd when in a deeper
      // directory
      if(tasks) {
        process.chdir(path.dirname(file));
      }
    }

    if(!tasks) {
      return done(
        new Error(
          'no task file (' + NAME + ') found in ' + process.cwd()
          + ' or any parent directories '
        )); 
    }

    var collection = mk.task()
      , runner;

    if(!collection.tasks.length) {
      return done(
        new Error(
          'task file ' + file + ' does not define task functions'
        )); 
    }

    runner = collection.run();
    list = req.unparsed;

    if(this.tasks) {

      // print from auto-detected file
      if(!files) {
        files = [file];
      }
         
      return print(files, runner, conf.output, done); 
    }

    for(var i = 0;i < list.length;i++) {
      if(!runner.get(list[i])) {
        return done(
          new Error('task not found: ' + list[i])); 
      } 
    }

    // set up execution scope for default task collection
    runner.scope = {args: req.args};

    runner.each(list, done);  
  })
}

main.pkg = pkg;

module.exports = main;
