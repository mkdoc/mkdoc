var fs = require('fs');

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
  help: help,
  version: version,
  error: error,
  finish: finish
}
