var path = require('path')
  , transform = require('mktransform')
  , cli = require('mkcli')
  , spawn = require('child_process').spawn
  , COMMAND = 'source-highlight'
  , pkg = require('mktransform/package.json')
  , prg = cli.load(require('../doc/json/mkhigh.json'));

/**
 *  Stream transform implementation.
 *
 *  @private {function} highlight
 */
function highlight(through, ast, opts) {
  var Node = ast.Node;

  function transform(chunk, encoding, cb) {
    var scope = this;
    if(Node.is(chunk, Node.CODE_BLOCK) && chunk.info) {
      var lang = chunk.info.split(/\s+/)[0]
        , literal = chunk.literal
        , args = ['--gen-version', '--src-lang', lang]
        , result = new Buffer(0);

      // number source code lines
      if(opts.lines) {
        literal = literal.replace(/\n$/, '');
        args.push('--line-number= '); 
      }

      var ps = spawn(COMMAND, args);

      ps.stdout.on('data', function(data) {
        result = Buffer.concat(
          [result, data], result.length + data.length);
      })

      ps.once('close', function(code) {
        if(code === 0 && result.length) {
          //console.error('' + result);
          var doc = ast.parse('' + result);
          doc.firstChild.unlink();
          var next = doc.firstChild;
          while(next) {
            scope.push(next); 
            next = next.next;
          }
          //for(var i = 0;i < nodes.length;i++) {
            //console.error(nodes[i]._htmlBlockType);
            //scope.push(nodes[i]); 
          //}
          cb();
        }else{
          cb(null, chunk); 
        }
      })

      ps.stdin.end(literal);
    }else{
      cb(null, chunk);
    }
  }

  return through.transform(transform);
}

/**
 *  @name mkhigh
 *  @cli doc/cli/mkhigh.md
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
      output: conf.output,
      transforms: [highlight]
    }
    , runtime = {
        base: path.normalize(path.join(__dirname, '..')),
        target: opts,
        hints: prg,
        help: {
          file: 'doc/help/mkhigh.txt',
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
          require('mkcli/plugin/version')
        ]
      };

  cli.run(prg, argv, runtime, function parsed(err, req) {
    if(err || req.aborted) {
      return cb(err); 
    }

    // transform can throw on bad export
    try {
      transform(this, cb);
    }catch(e) {
      return cb(e); 
    }

  })
}

main.pkg = pkg;

module.exports = main;
