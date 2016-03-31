var fs = require('fs');

var repeat = require('string-repeater');

function usage(pkg, opts) {
  var indent = '  '
    , max = 0
    , space = 2
    , keys
    , name = opts.name || pkg.name
    , synopsis = opts.synopsis || '[options]';

  delete opts.name;
  delete opts.synopsis;

  keys = Object.keys(opts)

  keys.forEach(function(key) {
    max = Math.max(max, key.length);
  })

  console.log('%s %s', name, synopsis); 
  console.log();
  console.log(pkg.description + '.');
  console.log();

  keys.forEach(function(key) {
    var padding = (max - key.length) + space;
    padding = repeat(' ', padding);
    console.log(indent + '%s%s%s', key, padding, opts[key]);
  })

  console.log();
  console.log('Report bugs to %s', pkg.bugs.url);
}

function error(msg) {
  var prefix = 'ERR | ';
  console.error(prefix + msg);
  process.exit(1);
}

function version(pkg) {
  return function() {
    console.log('%s %s', pkg.name, pkg.version); 
  }
}

function help(file) {
  return function() {
    fs.createReadStream(file).pipe(process.stdout);
  }
}

function finish(err, res) {
  if(err) {
    error(err.message || err.stack); 
  }else if(!err && res) {
    if(typeof res === 'function') {
      res(); 
    } 
  }
}

module.exports = {
  usage: usage,
  help: help,
  version: version,
  error: error,
  finish: finish
}
