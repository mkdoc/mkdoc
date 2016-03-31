var fs = require('fs')
  , path = require('path')
  , mk = require('mktask');

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
  var src = 'doc/cli'
    , out = 'doc/help'
    , files = fs.readdirSync(src);

  function next(err) {
    if(err) {
      return cb(err); 
    }

    var file = files.shift();
    if(!file) {
      return cb();
    }

    var source = path.join(src, file)
      , name = file.replace(/\.md$/, '')
      , dest = name + '.txt'
      , pkg;

    pkg = require((name === 'mk' ? 'mktask' : name) + '/package.json');
    dest = path.join(out, dest);

    mk.doc(source)
      .pipe(mk.cli.src())
      .pipe(mk.cli.dest({type: 'help', pkg: pkg}))
      .pipe(mk.dest(dest))
      .on('finish', next);
  }

  next();
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
mk.task(help);
mk.task(readme);
