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
      stream: mk.dest('API.md'),
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
mk.task(man);
mk.task(zsh);
mk.task(cli);
mk.task(readme);
