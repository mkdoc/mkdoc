var mk = require('mktask');

// @unknown-tag to trigger a code path.

// @task non-existent triggers a code path when printing tasks.

// @task readme build the readme file.
function readme(cb) {
  cb();
}

mk.task(readme);
