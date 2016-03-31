function error(msg) {
  var prefix = 'ERR | ';
  console.error(prefix + msg);
  process.exit(1);
}

function finish(err) {
  if(err) {
    error(err.message || err.stack); 
  }
}

module.exports = {
  error: error,
  finish: finish
}
