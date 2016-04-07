var mk = require('mktask');

function bin(type, src, out, cb) {
  var opts = {
      files: [src],
      type: type,
      dest: {},
      newline: false,
      footer: true
    };

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

// @task help build the cli help files.
function help(cb) {
  bin(mk.cli.HELP, 'doc/cli', 'doc/help', cb);
}

// @task cli build the cli definition files.
function cli(cb) {
  bin(mk.cli.JSON, 'doc/cli', 'doc/cli', cb);
}

// @task man build the man pages.
function man(cb) {
  bin(mk.cli.MAN, 'doc/cli', 'doc/man', cb);
}

// @task readme build the readme file.
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
mk.task(cli);
mk.task(man);
mk.task(help);
mk.task(readme);
