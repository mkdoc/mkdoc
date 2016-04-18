var fs = require('fs')
  , mk = require('mktask');

function info() {
  var programs = fs.readdirSync('bin')
    , main
    , map = {}
    , names = {};

  programs.forEach(function(name) {
    var nm = name;
    if(nm !== 'mk') {
      nm = nm.replace(/^mk/, ''); 
    }
    // get package descriptor from main function
    main = require('./cli/' + nm);
    map[name] = main.pkg;
    names[name] = name;
  })
  return {packages: map, names: names};
}

function bin(type, src, out, cb) {
  var detail = info()
    , opts = {
        files: [src],
        type: type,
        dest: {},
        pi: [mk.cli.MAN],
        newline: false,
        footer: true,
        packages: detail.packages,
        names: detail.names
      };

  if(type === mk.cli.HELP) {
    opts.summarize = true;
    opts.desc = 0;
  }

  opts.dest[type] = out;
  mk.exe(opts, cb);
}

// @task api build the api docs.
function api(cb) {
  mk.api(
    ['index.js'],
    {
      output: mk.dest('API.md'),
      heading: 'API'
    }, cb);
}

// @task json build the cli descriptor files
function json(cb) {
  bin(mk.cli.JSON, 'doc/cli', 'doc/json', cb);
}

// @task help build the help files
function help(cb) {
  bin(mk.cli.HELP, 'doc/cli', 'doc/help', cb);
}

// @task man build the man pages
function man(cb) {
  bin(mk.cli.MAN, 'doc/cli', 'doc/man', cb);
}

// @task zsh build the zsh completion files
function zsh(cb) {
  bin(mk.cli.ZSH, 'doc/cli', 'doc/zsh', cb);
}

// @task cli build all command line interface files
function cli() {
  return [json, help, man, zsh];
}

// @task guide build the task man page guide
function guide(cb) {
  var base = 'node_modules/mktask/doc/readme/';
  mk.doc(
      [
        base + 'creating-tasks.md',
        base + 'task-documentation.md',
        base + 'task-names.md',
        base + 'main-task.md',
        base + 'deferred-tasks.md',
        base + 'stream-tasks.md',
        base + 'task-dependencies.md',
        base + 'task-arguments.md'
      ]   
    )
    .pipe(mk.pi())
    // convert to level 1 headings
    .pipe(mk.level({all: -2}))
    .pipe(mk.out())
    .pipe(mk.dest('doc/cli/include/mktask-guide.md'))
    .on('finish', cb);
  cb(); 
}

// @task transform build the transform man page guide
function transform(cb) {
  var base = 'node_modules/mktransform/doc/readme/';
  mk.doc(
      [
        base + 'stream-functions.md'
      ]   
    )
    .pipe(mk.pi())
    // convert to level 1 headings
    .pipe(mk.level({all: -1}))
    .pipe(mk.out())
    .pipe(mk.dest('doc/cli/include/mktransform-guide.md'))
    .on('finish', cb);
  cb(); 
}


// @task inc build the manual include files 
function inc(cb) {
  var detail = info()
    , k
    , pkg
    , files = [];

  for(k in detail.packages) {
    pkg = detail.packages[k];
    if(pkg.config && pkg.config.man) {
      if(pkg.config.man.example) {
        files.push(
          {
            src: 'node_modules/' + pkg.name + '/doc/readme/example.md',
            dest: 'doc/cli/include/' + pkg.name + '-example.md',
          }); 
      } 
    }
  }

  function next(err) {
    if(err) {
      return cb(err); 
    }
    var file = files.shift();
    if(!file) {
      return cb();
    }
    mk.doc(file.src)
      .pipe(mk.pi())
      // convert to level 1 headings from level 2
      .pipe(mk.level({all: -1}))
      .pipe(mk.out())
      .pipe(mk.dest(file.dest))
      .on('finish', next);
  }

  next();
}

// @task readme build the readme file
function readme(cb) {
  mk.doc('doc/readme.md')
    .pipe(mk.pi())
    .pipe(mk.ref())
    .pipe(mk.abs())
    .pipe(mk.msg())
    .pipe(mk.toc({depth: 2, max: 3}))
    //.pipe(mk.ast.stringify())
    //.pipe(process.stdout)
    .pipe(mk.out())
    .pipe(mk.dest('README.md'))
    .on('finish', cb);
}

mk.task(api);
mk.task(json);
mk.task(help);
mk.task([guide, transform, inc], man);
mk.task(zsh);
mk.task(cli);
mk.task(guide);
mk.task(transform);
mk.task(inc);
mk.task(readme);
