var mk = require('mktask');

// @task readme build the readme file.
function readme(cb) {
  cb();
}

// fool the linter
mk = readme;

// oops forgot to register the task
