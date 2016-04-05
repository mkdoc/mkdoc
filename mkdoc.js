var fs = require('fs')
  , path = require('path')
  , mk = require('mktask');

function bin(type, ext, src, out, cb) {
  var files = fs.readdirSync(src);

  function next(err) {
    if(err) {
      return cb(err); 
    }

    var file = files.shift();
    if(!file) {
      return cb();
    }

    // ignore non markdown files (compiled json files)
    if(!/\.md$/.test(file)) {
      return next(); 
    }

    var source = path.join(src, file)
      , name = file.replace(/\.[\w]+$/, '')
      , dest = name + '.' + ext
      , pkg;

    try {
      pkg = require((name === 'mk' ? 'mktask' : name) + '/package.json');
      // NOTE: some programs do not have a corresponding
      // NOTE: module, eg: mkman, mktext etc.
    }catch(e){}

    dest = path.join(out, dest);

    var opts = {type: type, pkg: pkg, newline: false, footer: true};

    var stream = mk.doc(source);

    // prevent circular references when json output type
    if(type === mk.cli.JSON) {
      stream = stream.pipe(mk.ast.convert());
    }
     
    // parse state information from the input doc(s)
    stream = stream.pipe(mk.cli.src(opts));

    // json output needs to go through the compiler
    if(type === mk.cli.JSON) {
      stream = stream.pipe(mk.cli.compiler());
    }

    // hook up output renderer
    stream = stream.pipe(mk.cli.dest(opts))
    
    if(type !== mk.cli.JSON) {
      // need to convert the json records using an output renderer
      if(type === mk.cli.HELP) {
        stream = stream.pipe(mk.out({type: 'text'}))
      }
    }
    
    stream = stream.pipe(mk.dest(dest));

    stream.on('finish', next);
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
  bin(mk.cli.HELP, 'txt', src, out, cb);
}

// @task cli build the cli definition files.
function cli(cb) {
  var src = 'doc/cli'
    , out = 'doc/cli';
  bin(mk.cli.JSON, 'json', src, out, cb);
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
