var fs = require('fs')
  , path = require('path')
  , ast = require('mkast')
  , out = require('mkout')
  , mk = require('mktask')
  , doc = require('../index')
  , cli = require('mkcli')
  , EXTENSIONS = /\.(md|markdown)$/;

function collect(files, opts, cb) {
  var extensions = opts.extensions || EXTENSIONS
    , sources = [];

  files = files.slice();

  function done(err) {
    cb(err, sources); 
  }

  // get file info
  function stat(err) {
    if(err) {
      return done(err); 
    }

    var file = files.shift();
    if(!file) {
      return done(); 
    }

    if(!/^\//.test(file)) {
      file = path.join(process.cwd(), file); 
    }
    file = path.normalize(file);
    fs.stat(file, function(err, stats) {
      if(err) {
        return done(err); 
      } 
      if(stats.isDirectory()) {
        // search directories 
        fs.readdir(file, function(err, list) {
          if(err) {
            return done(err);             
          } 

          list = list.map(function(name) {
            return path.join(file, name)
          })

          list = list.filter(function(path) {
            // skip duplicates
            if(~sources.indexOf(path)) {
              return false; 
            }
            return extensions.test(path);
          })
          
          sources = sources.concat(list);
          stat();
        });
      }else{

        // not a known file extension - skip
        if(!extensions.test(file)) {
          return stat(); 
        }
        if(!~sources.indexOf(file)) {
          sources.push(file);
        }

        stat();
      }
    })
  }
  stat();
}

function compile(source, dest, opts, cb) {
  var type = opts.type
    , stream = doc(source);

  if(type === cli.JSON || type === cli.ZSH) {
    opts.recursive = true; 
  }

  // process pi triggers, should match the type as a string
  // or be an array of output types to trigger processing instruction
  // parsing for
  if(opts.pi) {
    if(type === opts.pi
      || (Array.isArray(opts.pi) && ~opts.pi.indexOf(type))) {
      var Processor = require('mkpi')
      stream = stream.pipe(new Processor(opts));
    } 
  }

  // prevent circular references when json output type
  if(type === cli.JSON) {
    stream = stream.pipe(ast.convert());
  }
   
  // parse state information from the input doc(s)
  stream = stream.pipe(cli.src(opts));

  // json output needs to go through the compiler
  if(type === cli.JSON || type === cli.ZSH) {
    stream = stream.pipe(cli.compiler());
  }

  // hook up output renderer
  stream = stream.pipe(cli.dest(opts))
  
  if(type !== cli.JSON) {
    // need to convert the json records using an output renderer
    if(type === cli.HELP || type === cli.ZSH) {
      stream = stream.pipe(out({type: 'text'}));
    }else if(type === cli.MAN) {
      var man = {title: opts.title};
      if(opts.pkg) {
        man.preambleVersion = opts.pkg.version; 
      }
      stream = stream.pipe(
        out({type: 'man', render: man}));
    }
  }

  // send to destination file
  stream = stream.pipe(mk.dest(dest));

  stream.on('finish', cb);
}

function build(sources, opts, cb) {
  //console.dir(opts);
  var types = cli.types
    , keys = Object.keys(types)
    , dest = opts.dest || {}
    , extensions = opts.extensions || EXTENSIONS
    // map types to file extensions
    , ext = opts.ext || {
        json: 'json',
        help: 'txt',
        man: '1',
        zsh: '',
        bash: 'sh'
      }

  // just build for the specified type
  if(opts.type) {
    keys = [opts.type]; 
  }

  function type() {
    var id = keys.shift();
    if(!id) {
      return cb(); 
    }

    // set output type
    opts.type = id;

    var files = sources.slice();

    function source(err) {
      if(err) {
        return cb(err); 
      }

      var src = files.shift()
        , target
        , name
        , suffix = ext[id] ? '.' + ext[id] : '';

      if(!src) {
        // no more sources process next type
        return type(); 
      }

      // destination directory
      target = dest[id] || path.dirname(src);

      // add file name and update extension
      name = path.basename(src);
      name = name.replace(extensions, '');

      if(id === cli.ZSH) {
        name = '_' + name; 
      }

      // use package (`pkg`) when available by name map
      if(opts.packages && opts.packages[name]) { 
        opts.pkg = opts.packages[name];
      }

      if(opts.names && opts.names[name]) { 
        opts.title = opts.names[name];
      }

      // use file extension
      target = path.join(target, name + suffix);

      compile(src, target, opts, source);
    }
    source();
  }

  // iterate types
  type();
}

/**
 *  Compiles all available output types for the cli library.
 */
function main(opts, cb) {
  function onSources(err, sources) {
    if(err) {
      return cb(err); 
    }
    if(!sources.length) {
      return cb(new Error('no input markdown definition files found')); 
    }
    build(sources, opts, cb);
  }
  collect(opts.files, opts, onSources);
}

module.exports = main;
