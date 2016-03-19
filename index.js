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
  var i = 0
    , arg;

  // list of files rather than an array
  if(typeof files === 'string' || Array.isArray(files)) {
    files = Array.isArray(files) ? files : [files]; 
    while((arg = arguments[i++])) {
      if(typeof arg === 'string') {
        files.push(arg);
      }else if(Array.isArray(arg)) {
        files = files.concat(arg); 
      }
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
