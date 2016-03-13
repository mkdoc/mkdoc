var repeat = require('string-repeater');

function usage(pkg, opts) {
  var indent = '  '
    , max = 0
    , space = 2
    , keys = Object.keys(opts);

  keys.forEach(function(key) {
    max = Math.max(max, key.length);
  })

  console.log('%s %s', pkg.name, '[options] [files...]'); 
  console.log();

  keys.forEach(function(key) {
    var padding = (max - key.length) + space;
    padding = repeat(' ', padding);
    console.log(indent + '%s%s%s', key, padding, opts[key]);
  })

  console.log();
  console.log('Report bugs to %s', pkg.bugs.url);
}

module.exports = usage;
