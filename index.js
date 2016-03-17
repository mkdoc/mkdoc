var cat = require('mkcat')
  , assert = require('assert');

/**
 *  Creates a stream pipeline using [mkcat][] from the given source files.
 *
 *  Rather than an array you can pass file paths in the form:
 *
 *  ```javascript
 *  doc('intro.md', 'install.md', {});
 *  ```
 *  @function doc
 *  @param {Array} files source markdown files.
 *  @param {Object} [opts] processing options.
 *
 *  @returns an output stream.
 */
function doc(files, opts) {
  var i;

  // list of files rather than an array
  if(typeof files === 'string') {
    files = [files]; 
    // start from next arg
    i = 1;
    while(typeof arguments[i++] === 'string') {
      files.push(arguments[i - 1]);
    }

    // grab options arguments
    if(typeof arguments[i - 1] === 'object') {
      opts = arguments[i - 1];
    }
  }

  opts = opts || {};

  assert(Array.isArray(files), 'file list sources expected');
  opts.files = files;

  return cat(opts);
}

module.exports = doc;
