var path = require('path')
  , parse = require('mkparse')
  , lang = require('mkparse/lang')
  , Collator = require('mkparse/lib/collator')
  , bin = require('mkcli')
  , def = require('../doc/cli/mkparse.json')
  , pkg = require('mkparse/package.json')
  , prg = bin.load(def, pkg);

/**
 *  @name mkparse
 *  @cli doc/cli/mkparse.md
 */
function main(argv, cb) {

  if(typeof argv === 'function') {
    cb = argv;
    argv = null;
  }

  var opts = {
      output: process.stdout
    }
    , runtime = {
        base: path.normalize(path.join(__dirname, '..')),
        target: opts,
        hints: prg,
        help: {
          file: 'doc/help/mkparse.txt'
        },
        version: pkg,
        plugins: [
          require('mkcli/plugin/hints'),
          require('mkcli/plugin/argv'),
          require('mkcli/plugin/help'),
          require('mkcli/plugin/version')
        ]
      };

  prg.run(argv, runtime, function parsed(err) {
    if(err) {
      return cb(err); 
    }

    var files = this.unparsed
      // file iterator
      , it = next.bind(this);

    if(!files.length) {
      return cb(new Error('no files specified')); 
    }

    this.files = files;
    this.content = Boolean(this.content);

    if(this.strip) {
      this.content = true;
      this.comment = false;

      // not printing comments, cannot print json
      this.json = false;
    }

    if(this.lang && !lang.map[this.lang]) {
      return cb(new Error('unknown language pack id: ' + this.lang)); 
    }

    function next() {
      var file = files.shift();
      if(!file) {
        return cb();  
      } 

      // attempt to work out language from file extension
      var name = path.basename(file)
        , ext = name.substr(name.lastIndexOf('.'))
        , id
        , pack = this.lang;

      if(!pack && ext) {
        ext = ext.replace(/^\./, '');
        id = lang.find(ext);
        // not a trailing period if still not the empty string
        if(ext && id) {
          pack = id; 
        }
      }

      if(pack && lang.exists(pack)) {
        opts.rules = lang.load(pack);
      }

      if(!pack) {
        console.error('unkown language for file %s (skipping)', file); 
        return it();
      }

      var stream = parse.load(file, this, it)
        , collator;

      if(this.json) {
        stream = stream.stringify(
          parseInt(this.indent) || 0, !this.content ? true : false);
        stream.pipe(this.output);
      }else{
        collator = new Collator(this);
        stream.pipe(collator).pipe(this.output);
      }
    }

    it();
  })
}

module.exports = main;
