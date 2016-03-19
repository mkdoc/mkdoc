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
  var args = Array.prototype.slice.call(arguments)
    , arg;

  // list of files rather than an array
  if(typeof files === 'string' || Array.isArray(files)) {
    files = Array.isArray(files) ? files : [];
    while((arg = args.shift())) {
      if(typeof arg === 'string') {
        files.push(arg);
      }else if(Array.isArray(arg)) {
        files = files.concat(arg); 
      }else if(arg && typeof arg === 'object') {
        opts = arg; 
      }
    }
  }

  opts = opts || {};

  assert(Array.isArray(files), 'file list sources expected');
  opts.files = files;

  return cat(opts);
}

module.exports = doc;
