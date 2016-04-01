var mk = require('mktask')
  // trigger relative code path
  , relative = require('../../cli/util')
  // trigger a normal module code path
  , ast = require('mkast');

// fool the linter
ast = relative;

// @task readme build the readme file.
function readme(cb) {
  cb();
}

mk.task(readme);
