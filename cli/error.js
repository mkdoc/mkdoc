function error(msg) {
  var prefix = 'error: ';
  console.error(prefix + msg);
  process.exit(1);
}

module.exports = error;
