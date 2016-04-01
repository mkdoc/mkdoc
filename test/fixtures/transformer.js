function transformer(through) {
  function transform(chunk, encoding, cb) {
    // set property for assertion
    transformer.transformed = true;
    this.push(chunk);
    cb();
  }

  return through.transform(transform);
}

module.exports = transformer;
