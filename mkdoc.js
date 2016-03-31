var fs = require('fs')
  , path = require('path')
  , mk = require('mktask');

function bin(type, ext, src, out, buffer, cb) {
  var files = fs.readdirSync(src);

  function next(err) {
    if(err) {
      return cb(err); 
    }

    var file = files.shift();
    if(!file) {
      return cb();
    }

    var source = path.join(src, file)
      , name = file.replace(/\.[\w]+$/, '')
      , dest = name + '.' + ext
      , pkg;

    pkg = require((name === 'mk' ? 'mktask' : name) + '/package.json');
    dest = path.join(out, dest);

    var opts = {type: type, pkg: pkg};

    var stream = mk.doc(source);

    // prevent circular references when json output type
    if(type === mk.cli.types.json) {
      stream = stream.pipe(mk.ast.convert());
    }
      
    stream.pipe(mk.cli.src(opts))
      .pipe(mk.cli.dest(opts))
      .pipe(mk.dest(dest))
      .on('finish', next);
  }

  next();
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
  var src = 'doc/cli'
    , out = 'doc/help';
  bin('help', 'txt', src, out, false, cb);
}

// @task cli build the cli definition files.
function cli(cb) {
  var src = 'doc/cli'
    , out = 'doc/cli';
  bin('json', 'json', src, out, true, cb);
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
mk.task(help);
mk.task(readme);
