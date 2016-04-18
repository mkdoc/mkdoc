function error(msg) {
  var prefix = 'ERR | ';
  process.stderr.write(prefix + msg + '\n');
  process.exitCode = 1;
  /* istanbul ignore next: always in test env */
  if(!process.env.NODE_ENV) {
    process.exit(); 
  }
}

function finish(err) {
  if(err) {
    console.error(err.stack);
    /* istanbul ignore next: an error with no message can happen */
    error(err.message || err.stack); 
  }
}

module.exports = {
  error: error,
  finish: finish
}
