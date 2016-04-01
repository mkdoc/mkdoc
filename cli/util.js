function error(msg) {
  var prefix = 'ERR | ';
  process.stdout.write(prefix + msg + '\n');
  process.exitCode = 1;
}

function finish(err) {
  if(err) {
    /* istanbul ignore next: an error with no message can happen */
    error(err.message || err.stack); 
  }
}

module.exports = {
  error: error,
  finish: finish
}
