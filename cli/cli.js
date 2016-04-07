var path = require('path')
  , cli = require('mkcli')
  , pkg = require('mkcli/package.json')
  , prg = cli.load(require('../doc/json/mkcli.json'));

/**
 *  @name mkcli
 *  @cli doc/cli/mkcli.md
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
        multiple: prg,
        help: {
          file: 'doc/help/mkcli.txt',
          output: conf.output
        },
        version: {
          name: pkg.name,
          version: pkg.version,
          output: conf.output
        },
        plugins: [
          require('mkcli/plugin/epipe'),
          require('mkcli/plugin/hints'),
          require('mkcli/plugin/argv'),
          require('mkcli/plugin/help'),
          require('mkcli/plugin/version'),
          require('mkcli/plugin/multiple')
        ]
      };

  cli.run(prg, argv, runtime, function parsed(err, req) {
    if(err || req.aborted) {
      return cb(err); 
    }

    // user defined package.json with additional meta data
    var pth = this.package
      , pack;
    if(pth) {
      if(!/^\//.test(pth)) {
        pth = path.join(process.cwd(), pth);
      }
      try {
        pack = require(pth);
      }catch(e) {
        return cb(e); 
      }
    }

    this.pkg = pack;
    if(!req.unparsed.length) {
      this.type = this.type || cli.JSON;
    }
    this.cols = parseInt(this.cols);
    this.split = parseInt(this.split);

    if(this.indent) {
      var indent = parseInt(this.indent) || 2;
      this.indent = '';
      while(indent--) {
        this.indent += ' '; 
      }
    }

    this.section = this.section.map(function(ptn) {
      try {
        return new RegExp(ptn, 'im'); 
      }catch(e) {
        return cb(e); 
      }
    })

    // compiler compacts the output by default
    // allow including the tree nodes when full is set
    this.compact = !this.full;

    if(this.desc !== undefined) {
      this.desc = parseInt(this.desc);
    }

    // use the helper to build input files
    // to type(s)
    if(req.unparsed.length) {
      this.files = req.unparsed;
      cli = require('../lib/exe');

      if(this.dir || this.json || this.text || this.man) {
        this.dest = {
          json: this.json || this.dir,
          help: this.text || this.dir,
          man: this.man || this.dir
        } 
      }
    }

    cli(this, cb);
  })
}

main.pkg = pkg;

module.exports = main;
