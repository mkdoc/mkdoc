var path = require('path')
  , cli = require('mkcli')
  , bin = require('mkcli')
  , def = require('../doc/cli/mkcli.json')
  , pkg = require('mkcli/package.json')
  , prg = bin.load(def, pkg);

/**
 *  @name mkcli
 *  @cli doc/cli/mkcli.md
 */
function main(argv, cb) {

  if(typeof argv === 'function') {
    cb = argv;
    argv = null;
  }

  var opts = {
      input: process.stdin, 
      output: process.stdout
    }
    , runtime = {
        base: path.normalize(path.join(__dirname, '..')),
        target: opts,
        hints: prg,
        help: {
          file: 'doc/help/mkcli.txt'
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
    this.type = this.type || cli.types.json;

    cli(this, cb);
  })
}

module.exports = main;


//var path = require('path')
  //, cli = require('mkcli')
  //, parser = require('cli-argparse')
  //, utils = require('./util')
  //, hints = {
      //options: [
        //'-t',
        //'-p'
      //],
      //flags: [
        //'--help'
      //],
      //alias: {
        //'-p --package': 'pkg',
        //'-t --type': 'type',
        //'-h --help': 'help'
      //}
    //}
  //, pkg = require('mkcli/package.json');

//function prg(argv, cb) {

  ////if(typeof argv === 'function') {
    ////cb = argv;
    ////argv = null;
  ////}

  //// user defined package.json with additional meta data
  //var args = parser(argv, hints)
    //, pack
    //, pth = args.options.pkg;

  //if(pth) {
    //if(!/^\//.test(pth)) {
      //pth = path.join(process.cwd(), pth);
    //}
    //try {
      //pack = require(pth);
    //}catch(e) {
      //return cb(e); 
    //}
  //}

  //var opts = {
        //input: process.stdin, 
        //output: process.stdout,
        //type: args.options.type || cli.types.json,
        //pkg: pack
      //};

  //if(args.flags.help) {
    //return cb(null, utils.help('doc/help/mkcli.txt'));
  //}else if(args.flags.version) {
    //return cb(null, utils.version(pkg));
  //}

  //cli(opts, cb);
//}

//module.exports = prg;
