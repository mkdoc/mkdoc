var cat = require('mkcat');

/**
 *  Creates a stream pipeline using [mkcat][].
 *
 *  @param {Array} file source markdown files.
 *  @param {Object} [opts] processing options.
 *
 *  @returns an output stream.
 */
function doc(files, opts) {
  var i;

  if(typeof files === 'string') {
    files = [files]; 
    // start from next arg
    i = 1;
    while(typeof arguments[i++] === 'string') {
      files.push(arguments[i - 1]);
    }
  }

  opts = opts || {};

  // discourage reading from stdin
  opts.input = opts.input !== undefined ? opts.input : false;

  opts.files = files;

  return cat(opts);
}

module.exports = doc;
