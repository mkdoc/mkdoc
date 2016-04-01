var mk = require('mktask');

// @unknown-tag to trigger a code path.

// @task non-existent triggers a code path when printing tasks.

// @task readme build the readme file.
function readme(cb) {
  //mk.doc('paragraph.md')
    //.pipe(mk.out())
    //.on('finish', cb);
  cb();
}

// @task throwable throws an error.
function throwable() {
  throw new Error('mock error');
}

mk.task(readme);
mk.task(throwable);
