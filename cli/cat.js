var path = require('path')
  , cat = require('mkcat')
  , bin = require('mkcli')
  , def = require('../doc/cli/mkcat.json')
  , pkg = require('mkcat/package.json')
  , prg = bin.load(def, pkg);

/**
 *  @name mkcat
 *  @cli doc/cli/mkcat.md
 */
function main(argv, cb) {

  if(typeof argv === 'function') {
    cb = argv;
    argv = null;
  }

  var opts = {
      // read from stdin before files, but be aware that file
      // information is lost so relative includes will not work as expected
      input: process.stdin, 
      output: process.stdout,
      serialize: true
    }
    , help = require('mkcli/plugin/help')
    , runtime = {
        base: path.normalize(path.join(__dirname, '..')),
        target: opts,
        hints: prg,
        help: {
          file: 'doc/help/mkcat.txt'
        },
        version: pkg,
        plugins: [
          require('mkcli/plugin/hints'),
          require('mkcli/plugin/argv'),
          help,
          require('mkcli/plugin/version')
        ]
      };

  prg.run(argv, runtime, function parsed(err) {
    if(err) {
      return cb(err); 
    }

    opts.files = this.unparsed;

    if(this.ast === false) {
      opts.buffer = true; 
    }

    function done(err, res) {

      if(res && res.once instanceof Function) {
        res.once('error', cb);
        // listen for the end of the write stream
        return res.once('end', done);
      }

      if(opts.buffer && res) {
        opts.output.write('' + res); 
      }
      process.stdin.end();
      cb(err, res);
    }

    var stream = cat(opts, done);
    stream.once('stdin', function(size, files) {
      if(!size && !files.length) {
        help.print(runtime.help.file, {runtime: runtime}, cb);
      } 
    })

  })
}

module.exports = main;
