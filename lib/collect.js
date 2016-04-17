/**
 *  Collect parsed arguments by prefix.
 *
 *  @param {String} id argument name prefix.
 *  @param {Object} scope target for parsed arguments.
 */
function collect(id, scope) {
  var map = {}
    , k
    , match = new RegExp('^' + id + '-')
    , key;

  for(k in scope) {
    if(match.test(k)) {
      key = k.replace(match, '');
      map[key]  = scope[k];
    } 
  }

  return map;
}

module.exports = collect;
